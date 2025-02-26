use std::ops::DerefMut;

use swc_core::ecma::{
    ast::*,
    visit::{VisitMut, VisitMutWith},
};

use crate::{
    constants::EffectorMethod,
    utils::{TryKeyOf, UObject},
    visitors::{MutableState, VisitorMeta},
};

struct ForceReflectScope {
    pub state: MutableState,
}

pub(crate) fn force_reflect_scope(meta: &VisitorMeta) -> impl VisitMut + use<> {
    ForceReflectScope { state: meta.state.clone() }
}

impl ForceReflectScope {
    fn inject_reflect(&self, node: &mut CallExpr) {
        let Some(config) = node.args.get_mut(0) else { return };
        let ExprOrSpread { spread: None, expr: config } = config else { return };
        let Expr::Object(config) = config.deref_mut() else { return };

        let has_option = config.props.iter().any(|prop| {
            prop.as_prop()
                .and_then(|prop| prop.try_key())
                .is_some_and(|key| key == *"useUnitConfig")
        });

        if !has_option {
            let use_unit_config = UObject::with(vec![("forceScope", true.into())]);
            let use_unit_config = UObject::prop("useUnitConfig", use_unit_config.into());

            config.props.push(use_unit_config);
        }
    }
}

impl VisitMut for ForceReflectScope {
    fn visit_mut_call_expr(&mut self, node: &mut CallExpr) {
        node.visit_mut_children_with(self);

        let state = self.state.borrow();

        let method = node
            .callee
            .as_expr()
            .and_then(|calle| calle.as_ident())
            .and_then(|ident| state.aliases.get(&ident.to_id()));

        let Some(method) = method else { return };

        match method {
            EffectorMethod::Reflect
            | EffectorMethod::ReflectList
            | EffectorMethod::ReflectVariant => self.inject_reflect(node),

            _ => (),
        };
    }
}
