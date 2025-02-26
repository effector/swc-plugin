use swc_core::{
    common::{DUMMY_SP, SourceMapper},
    ecma::{ast::*, atoms::JsWord},
};

use super::call_identity::CallIdentity;
use crate::{Config, constants::EffectorMethod, utils::UObject};

pub(super) struct MethodTransformer<'a> {
    pub mapper: &'a dyn SourceMapper,
    pub stack:  &'a Vec<Option<JsWord>>,
    pub config: &'a Config,

    pub method: EffectorMethod,
}

impl MethodTransformer<'_> {
    pub fn transform(&self, node: &mut CallExpr) {
        match self.method {
            EffectorMethod::Store | EffectorMethod::Merge => self.transform_store(node),

            EffectorMethod::Event | EffectorMethod::Effect | EffectorMethod::Domain => {
                self.transform_event(node)
            }

            EffectorMethod::Restore => self.transform_restore(node),

            EffectorMethod::Attach | EffectorMethod::Forward => {
                self.transform_op_single(node)
            }

            EffectorMethod::Combine
            | EffectorMethod::Sample
            | EffectorMethod::Guard
            | EffectorMethod::Split
            | EffectorMethod::CreateApi
            | EffectorMethod::Gate => self.transform_op_list(node),

            _ => {}
        };
    }

    fn prepare_config(&self, node: &CallExpr, in_place_of: usize) -> ExprOrSpread {
        let loc = self.mapper.lookup_char_pos(node.span.lo);
        let mut config = CallIdentity::new(self.stack, loc).render(self.config);

        if let Some(ExprOrSpread { expr, spread: None }) = node.args.get(in_place_of) {
            UObject::insert_and(&mut config, expr.clone());
        };

        Expr::Object(config).into()
    }

    fn transform_store(&self, node: &mut CallExpr) {
        let config = self.prepare_config(node, 1);

        match node.args.len() {
            0 => { /* invalid store creation */ }
            1 => node.args.push(config),
            _ => node.args[1] = config,
        };
    }

    fn transform_event(&self, node: &mut CallExpr) {
        let config = self.prepare_config(node, 1);

        match node.args.len() {
            0..=1 => node.args.push(config),
            _ => node.args[1] = config,
        };
    }

    fn transform_restore(&self, node: &mut CallExpr) {
        let config = self.prepare_config(node, 2);

        match node.args.len() {
            2 => node.args.push(config),
            3 => node.args[2] = config,
            _ => { /* invalid restore: skip */ }
        };
    }

    fn transform_op_single(&self, node: &mut CallExpr) {
        let loc = self.mapper.lookup_char_pos(node.span.lo);
        let config = CallIdentity::new(self.stack, loc).render(self.config);

        if let Some(ExprOrSpread { expr, spread: None }) = node.args.first() {
            let config = UObject::and_or(*expr.clone(), config.into());

            node.args = vec![Expr::Object(config).into()];
        }
    }

    fn transform_op_list(&self, node: &mut CallExpr) {
        let loc = self.mapper.lookup_char_pos(node.span.lo);
        let config = CallIdentity::new(self.stack, loc)
            .drop_name_if(
                self.method == EffectorMethod::CreateApi
                    || self.method == EffectorMethod::Split,
            )
            .render(self.config);

        let and = ArrayLit {
            span:  DUMMY_SP,
            elems: node.args.iter().map(|arg| Some(arg.clone())).collect(),
        };

        let and = Expr::Array(and);
        let config = UObject::and_or(and, config.into());

        node.args = vec![Expr::Object(config).into()];
    }
}
