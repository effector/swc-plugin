use std::ops::Deref;

use swc_core::{
    common::{sync::Lrc, util::take::Take},
    ecma::{
        ast::*,
        atoms::JsWord,
        utils::ExprFactory,
        visit::{VisitMut, VisitMutWith},
    },
};

use super::meta::VisitorMeta;
use crate::{constants::EffectorMethod, state::State, utils::UObject};

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

    fn inject_use_store_map(&self, node: &mut CallExpr) {
        match &mut node.args[..] {
            [
                ExprOrSpread { spread: None, expr: store },
                ExprOrSpread { spread: None, expr: func },
            ] => {
                /* { store, fn, keys: [], forceScope: true } */
                let config = UObject::with(vec![
                    ("store", *store.clone()),
                    ("fn", *func.clone()),
                    ("keys", ArrayLit::dummy().into()),
                    ("forceScope", true.into()),
                ]);

                node.args = vec![config.as_arg()];
            }
            [ExprOrSpread { spread: None, expr: config }] => {
                let Some(config) = config.as_mut_object() else { return };
                let has_option = config.props.iter().any(|prop| {
                    let Some(prop) = prop.as_prop() else { return false };

                    let key: Option<JsWord> = match prop.deref() {
                        Prop::KeyValue(kv) => match kv {
                            KeyValueProp { key: PropName::Ident(id), .. } => Some(id.sym.to_owned()),
                            KeyValueProp { key: PropName::Str(str), .. } => Some(str.value.to_owned()),
                            _ => None,
                        },
                        Prop::Shorthand(id) => Some(id.sym.to_owned()),
                        _ => None,
                    };

                    key.is_some_and(|key| key == String::from("forceScope"))
                });

                if !has_option {
                    config.props.insert(0, UObject::prop("forceScope", true.into()));
                };
            }
            _ => return,
        };
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
