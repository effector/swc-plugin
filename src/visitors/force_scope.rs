use swc_core::{
    common::{sync::Lrc, util::take::Take},
    ecma::{
        ast::*,
        utils::ExprFactory,
        visit::{VisitMut, VisitMutWith},
    },
};

use super::meta::VisitorMeta;
use crate::{
    constants::EffectorMethod,
    state::State,
    utils::{TryKeyOf, UObject},
};

pub(crate) struct AsForceScope {
    meta: Lrc<VisitorMeta>,
}

struct ForceScope<'a> {
    pub state: &'a State,
}

pub(crate) fn force_scope(meta: Lrc<VisitorMeta>) -> AsForceScope {
    AsForceScope { meta }
}

impl VisitMut for AsForceScope {
    fn visit_mut_module(&mut self, module: &mut Module) {
        let mut visitor = ForceScope { state: &self.meta.state.borrow() };

        module.visit_mut_with(&mut visitor);
    }

    fn visit_mut_script(&mut self, module: &mut Script) {
        let mut visitor = ForceScope { state: &self.meta.state.borrow() };

        module.visit_mut_with(&mut visitor);
    }
}

impl ForceScope<'_> {
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
                    config.props.insert(0, UObject::prop("forceScope", true.into()));
                };
            }

            _ => (/* malformed call */),
        }
    }
}

impl VisitMut for ForceScope<'_> {
    fn visit_mut_call_expr(&mut self, node: &mut CallExpr) {
        let method = node
            .callee
            .as_expr()
            .and_then(|calle| calle.as_ident())
            .and_then(|ident| self.state.aliases.get(&ident.to_id()));

        if let Some(method) = method {
            match method {
                EffectorMethod::UseUnit | EffectorMethod::UseEvent | EffectorMethod::UseStore => {
                    self.inject_use_unit(node, 1);
                }
                EffectorMethod::UseList => self.inject_use_unit(node, 2),

                EffectorMethod::UseGate => {
                    self.ensure_gate_props(node);
                    self.inject_use_unit(node, 2);
                }

                EffectorMethod::UseStoreMap => self.inject_use_store_map(node),

                _ => (/* not a hook */),
            };
        };
    }
}
