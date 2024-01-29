use std::{collections::HashMap, ops::DerefMut};

use swc_core::{
    common::sync::Lrc,
    ecma::{
        ast::*,
        visit::{VisitMut, VisitMutWith},
    },
};

use crate::{
    constants::EffectorMethod,
    state::State,
    utils::{TryKeyOf, UObject},
    visitors::meta::VisitorMeta,
};

struct AsForceReflectScope {
    meta: Lrc<VisitorMeta>,
}

struct ForceReflectScope<'a> {
    pub aliases: &'a HashMap<Id, EffectorMethod>,
}

pub(crate) fn force_reflect_scope(meta: Lrc<VisitorMeta>) -> impl VisitMut {
    AsForceReflectScope { meta }
}

impl VisitMut for AsForceReflectScope {
    fn visit_mut_module(&mut self, module: &mut Module) {
        let State { aliases, .. } = &*self.meta.state.borrow();
        let mut visitor = ForceReflectScope { aliases };

        module.visit_mut_with(&mut visitor);
    }

    fn visit_mut_script(&mut self, module: &mut Script) {
        let State { aliases, .. } = &*self.meta.state.borrow();
        let mut visitor = ForceReflectScope { aliases };

        module.visit_mut_with(&mut visitor);
    }
}

impl ForceReflectScope<'_> {
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

impl VisitMut for ForceReflectScope<'_> {
    fn visit_mut_call_expr(&mut self, node: &mut CallExpr) {
        let method = node
            .callee
            .as_expr()
            .and_then(|calle| calle.as_ident())
            .and_then(|ident| self.aliases.get(&ident.to_id()));

        let Some(method) = method else { return };

        match method {
            EffectorMethod::Reflect
            | EffectorMethod::ReflectList
            | EffectorMethod::ReflectVariant => self.inject_reflect(node),

            _ => (),
        };
    }
}
