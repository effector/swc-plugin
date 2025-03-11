use swc_core::{
    common::{SourceMapper, sync::Lrc},
    ecma::{
        ast::*,
        atoms::Atom,
        visit::{VisitMut, VisitMutWith, noop_visit_mut_type},
    },
    quote,
};

use self::{
    factory::{FactoryTransformer, WITH_FACTORY},
    method::MethodTransformer,
};
use crate::{
    constants::EffectorMethod,
    utils::{EffectorMatcher, TryKeyOf, UniqueId},
    visitors::VisitorMeta,
};

mod call_identity;
mod factory;
mod method;

struct UnitIdentifier {
    pub mapper:  Lrc<dyn SourceMapper>,
    pub matcher: EffectorMatcher,

    stack: Vec<Option<Atom>>,
    factory_import: Option<Ident>,
}

pub(crate) fn unit_identifier(meta: &VisitorMeta) -> impl VisitMut + use<> {
    UnitIdentifier {
        stack: Vec::new(),
        factory_import: None,

        mapper:  meta.mapper.clone(),
        matcher: EffectorMatcher::from_meta(meta),
    }
}

impl UnitIdentifier {
    fn visit_stacked(&mut self, id: Option<Atom>, node: &mut impl VisitMutWith<Self>) {
        self.stack.push(id);
        node.visit_mut_children_with(self);
        self.stack.pop();
    }

    fn match_factory(&self, node: &Expr) -> bool {
        let Expr::Ident(ident) = node else { return false };

        self.matcher
            .state
            .borrow()
            .factories
            .contains(&ident.to_id())
    }

    fn transform_method(&self, node: &mut CallExpr) {
        let Callee::Expr(expr) = &node.callee else { return };
        let Some(method) = self.matcher.try_match(expr) else { return };

        MethodTransformer {
            mapper: self.mapper.as_ref(),
            config: &self.matcher.config,
            stack:  &self.stack,

            method: method.to_owned(),
        }
        .transform(node)
    }

    fn transform_factory(&mut self, node: &mut CallExpr) {
        let Callee::Expr(expr) = &node.callee else { return };

        if self.match_factory(expr) {
            let id = self
                .factory_import
                .get_or_insert_with(|| UniqueId::ident(WITH_FACTORY));

            FactoryTransformer {
                mapper: self.mapper.as_ref(),
                config: &self.matcher.config,
                stack: &self.stack,

                id,
            }
            .transform(node);
        };
    }
}

impl VisitMut for UnitIdentifier {
    noop_visit_mut_type!();

    fn visit_mut_assign_expr(&mut self, node: &mut AssignExpr) {
        let id: Option<Atom> = match &node.left {
            AssignTarget::Simple(target) => match target {
                SimpleAssignTarget::Ident(binding) => Some(binding.id.sym.to_owned()),
                SimpleAssignTarget::Member(member) => match &member.prop {
                    MemberProp::Ident(id) => Some(id.sym.to_owned()),
                    _ => None,
                },
                _ => None,
            },
            _ => None,
        };

        self.visit_stacked(id, node);
    }

    fn visit_mut_key_value_prop(&mut self, node: &mut KeyValueProp) {
        let id = node.try_key();

        self.visit_stacked(id, node);
    }

    fn visit_mut_var_declarator(&mut self, node: &mut VarDeclarator) {
        if let Some(expr) = &mut node.init {
            let id: Option<Atom> = match &node.name {
                Pat::Ident(binding) => Some(binding.id.sym.to_owned()),
                _ => None,
            };

            self.visit_stacked(id, expr);
        }
    }

    fn visit_mut_call_expr(&mut self, node: &mut CallExpr) {
        // CallExpr -> callee do infer `name`
        node.callee.visit_mut_children_with(self);

        // CallExpr -> args do not inherit the name
        self.visit_stacked(None, &mut node.args);

        self.transform_method(node);
        self.transform_factory(node);
    }

    fn visit_mut_module(&mut self, node: &mut Module) {
        node.visit_mut_children_with(self);

        if let Some(id) = &self.factory_import {
            let import = quote!(
                "import { withFactory as $id } from 'effector'" as ModuleItem,
                id: Ident = id.clone()
            );

            let first_import = node
                .body
                .iter()
                .position(|expr| matches!(expr, ModuleItem::ModuleDecl(..)))
                .unwrap_or(0);

            self.matcher.track(id.to_id(), EffectorMethod::Factory);
            node.body.insert(first_import, import);
        }
    }
}
