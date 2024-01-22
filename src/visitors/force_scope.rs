use swc_core::{
    common::sync::Lrc,
    ecma::{
        ast::*,
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
        let mut visitor = ForceScope {
            state: &self.meta.state.borrow(),
        };

        module.visit_mut_with(&mut visitor);
    }

    fn visit_mut_script(&mut self, module: &mut Script) {
        let mut visitor = ForceScope {
            state: &self.meta.state.borrow(),
        };

        module.visit_mut_with(&mut visitor);
    }
}

impl ForceScope<'_> {
    fn force_scope(&self, node: &mut CallExpr) {
        match node.args.len() {
            1 => {
                let opts = UObject::with(vec![("forceScope", Expr::from(true))]);
                node.args.push(Expr::Object(opts).into());
            }
            2 => (/* unimplemented */),
            _ => (/* unsupported */),
        };
    }

    fn matches(&self, node: &CallExpr) -> bool {
        node.callee
            .as_expr()
            .and_then(|calle| calle.as_ident())
            .and_then(|ident| self.state.aliases.get(&ident.to_id()))
            .map_or(false, |method| *method == EffectorMethod::UseUnit)
    }
}

impl VisitMut for ForceScope<'_> {
    fn visit_mut_call_expr(&mut self, node: &mut CallExpr) {
        if self.matches(node) {
            self.force_scope(node);
        };
    }
}
