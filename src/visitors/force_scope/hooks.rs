use std::collections::HashMap;

use swc_core::{
    common::{sync::Lrc, util::take::Take},
    ecma::{
        ast::*,
        utils::ExprFactory,
        visit::{VisitMut, VisitMutWith},
    },
};

use crate::{
    constants::EffectorMethod,
    state::State,
    utils::{TryKeyOf, UObject},
    visitors::meta::VisitorMeta,
};

struct AsForceHooksScope {
    meta: Lrc<VisitorMeta>,
}

struct ForceHooksScope<'a> {
    pub aliases: &'a HashMap<Id, EffectorMethod>,
}

pub(crate) fn force_hooks_scope(meta: Lrc<VisitorMeta>) -> impl VisitMut {
    AsForceHooksScope { meta }
}

impl VisitMut for AsForceHooksScope {
    fn visit_mut_module(&mut self, module: &mut Module) {
        let State { aliases, .. } = &*self.meta.state.borrow();
        let mut visitor = ForceHooksScope { aliases };

        module.visit_mut_with(&mut visitor);
    }

    fn visit_mut_script(&mut self, module: &mut Script) {
        let State { aliases, .. } = &*self.meta.state.borrow();
        let mut visitor = ForceHooksScope { aliases };

        module.visit_mut_with(&mut visitor);
    }
}

impl ForceHooksScope<'_> {
    fn ensure_gate_props(&self, node: &mut CallExpr) {
        if node.args.len() == 1 {
            node.args.push(Expr::Object(ObjectLit::dummy()).into())
        }
    }

    fn inject_use_unit(&self, node: &mut CallExpr, after: usize) {
        if node.args.len() == after {
            let opts = UObject::with(vec![("forceScope", true.into())]);

            node.args.push(Expr::Object(opts).into())
        }
    }

    fn store_map_config(store: Expr, func: Expr) -> ObjectLit {
        let props = vec![
            ("store", store),
            ("fn", func),
            ("keys", ArrayLit::dummy().into()),
            ("forceScope", true.into()),
        ];

        UObject::with(props)
    }

    fn inject_use_store_map(&self, node: &mut CallExpr) {
        match &mut node.args[..] {
            [
                ExprOrSpread { spread: None, expr: store },
                ExprOrSpread { spread: None, expr: func },
            ] => {
                let config = Self::store_map_config(*store.to_owned(), *func.to_owned());
                node.args = vec![config.as_arg()];
            }

            [ExprOrSpread { spread: None, expr: config }] => {
                let Some(config) = config.as_mut_object() else { return };

                let has_option = config.props.iter().any(|prop| {
                    prop.as_prop()
                        .and_then(|prop| prop.try_key())
                        .is_some_and(|key| key == *"forceScope")
                });

                if !has_option {
                    let prop = UObject::prop("forceScope", true.into());
                    config.props.insert(0, prop);
                };
            }

            _ => (/* malformed call */),
        }
    }
}

impl VisitMut for ForceHooksScope<'_> {
    fn visit_mut_call_expr(&mut self, node: &mut CallExpr) {
        let method = node
            .callee
            .as_expr()
            .and_then(|calle| calle.as_ident())
            .and_then(|ident| self.aliases.get(&ident.to_id()));

        let Some(method) = method else { return };

        match method {
            EffectorMethod::UseUnit
            | EffectorMethod::UseEvent
            | EffectorMethod::UseStore => {
                self.inject_use_unit(node, 1);
            }

            EffectorMethod::UseList => self.inject_use_unit(node, 2),

            EffectorMethod::UseGate => {
                self.ensure_gate_props(node);
                self.inject_use_unit(node, 2);
            }

            EffectorMethod::UseStoreMap => self.inject_use_store_map(node),

            _ => (),
        };
    }
}