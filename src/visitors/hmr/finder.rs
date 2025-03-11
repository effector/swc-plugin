use swc_core::ecma::{
    ast::*,
    visit::{Visit, VisitWith},
};

use crate::{constants::EffectorMethod, utils::EffectorMatcher};

const CALLS: [EffectorMethod; 14] = [
    EffectorMethod::Store,
    EffectorMethod::Event,
    EffectorMethod::Effect,
    EffectorMethod::Merge,
    EffectorMethod::Restore,
    EffectorMethod::Combine,
    EffectorMethod::Sample,
    EffectorMethod::Forward,
    EffectorMethod::Guard,
    EffectorMethod::Attach,
    EffectorMethod::Split,
    EffectorMethod::CreateApi,
    EffectorMethod::Gate,
    EffectorMethod::Factory,
];

const METHODS: [&str; 8] = [
    "map",
    "filter",
    "filterMap",
    "subscribe",
    "on",
    "watch",
    "reset",
    "prepend",
];

pub struct CallFinder<'a> {
    matcher: &'a EffectorMatcher,

    found: bool,
}

impl<'a> CallFinder<'a> {
    pub fn new(matcher: &'a EffectorMatcher) -> Self {
        Self { matcher, found: false }
    }

    pub fn is_found(&self) -> bool {
        self.found
    }

    fn is_method(&self, expr: &Expr) -> bool {
        let Expr::Member(member) = expr else { return false };
        let MemberProp::Ident(ref ident) = member.prop else { return false };

        METHODS.contains(&ident.sym.as_str())
    }

    fn is_call(&self, expr: &Expr) -> bool {
        let Some(method) = self.matcher.try_match(expr) else { return false };

        CALLS.contains(&method)
    }
}

impl Visit for CallFinder<'_> {
    fn visit_arrow_expr(&mut self, _: &ArrowExpr) {}
    fn visit_function(&mut self, _: &Function) {}
    fn visit_class(&mut self, _: &Class) {}

    fn visit_call_expr(&mut self, node: &CallExpr) {
        if self.found {
            return /* stop traversal */;
        };

        let Callee::Expr(expr) = &node.callee else { return };
        self.found = self.is_call(expr) || self.is_method(expr);

        if !self.found {
            node.visit_children_with(self);
        }
    }
}
