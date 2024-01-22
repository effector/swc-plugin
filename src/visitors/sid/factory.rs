use swc_core::{
    common::{SourceMapper, DUMMY_SP},
    ecma::{ast::*, atoms::JsWord},
    quote,
};

use super::call_identity::CallIdentity;
use crate::{utils::UObject, Config};

pub(super) const WITH_FACTORY: &str = "_effector$factory";

pub(super) struct FactoryTransformer<'a> {
    pub mapper: &'a dyn SourceMapper,
    pub stack: &'a Vec<Option<JsWord>>,
    pub config: &'a Config,

    pub id: &'a Ident,
}

impl FactoryTransformer<'_> {
    fn method_expr(node: &CallExpr) -> Expr {
        node.callee
            .as_expr()
            .and_then(|expr| expr.as_ident())
            .map(|id| Str::from(id.sym.clone()))
            .map(Lit::Str)
            .map(Expr::from)
            .unwrap()
    }

    fn wrap(node: &CallExpr) -> Expr {
        quote!("() => $expr" as Expr, expr: Expr = node.clone().into())
    }

    pub fn transform(&self, node: &mut CallExpr) {
        let loc = self.mapper.lookup_char_pos(node.span.lo);
        let mut config = CallIdentity::new(self.stack, loc).render(self.config);

        if self.config.add_names {
            config
                .props
                .push(UObject::prop("method", Self::method_expr(node)));
        };

        config.props.push(UObject::prop("fn", Self::wrap(node)));

        let config: Box<Expr> = config.into();

        node.callee = Callee::Expr(self.id.clone().into());
        node.args = vec![config.into()];
        node.span = DUMMY_SP;
    }
}
