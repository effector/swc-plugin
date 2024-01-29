use std::{cell::RefCell, ops::Deref};

use swc_core::{
    common::{sync::Lrc, SourceMapper},
    ecma::{
        ast::*,
        atoms::JsWord,
        utils::quote_ident,
        visit::{noop_visit_mut_type, VisitMut, VisitMutWith},
    },
    quote,
};

use self::{
    factory::{FactoryTransformer, WITH_FACTORY},
    method::MethodTransformer,
};
use super::meta::VisitorMeta;
use crate::{
    constants::EffectorMethod,
    state::{EffectorImport, State},
    utils::{to_domain_method, to_method, TryKeyOf},
    Config,
};

mod call_identity;
mod factory;
mod method;

struct AsUnitIdentifier {
    meta: Lrc<VisitorMeta>,
}

struct UnitIdentifier<'a> {
    pub config: &'a Config,
    pub state:  &'a RefCell<State>,

    pub mapper: &'a dyn SourceMapper,

    stack: Vec<Option<JsWord>>,
    factory_import: Option<Ident>,
}

pub(crate) fn unit_identifier(meta: Lrc<VisitorMeta>) -> impl VisitMut {
    AsUnitIdentifier { meta }
}

impl AsUnitIdentifier {
    fn as_core(&self) -> UnitIdentifier<'_> {
        UnitIdentifier {
            stack: Vec::new(),
            factory_import: None,

            config: &self.meta.config,
            mapper: &*self.meta.mapper,
            state:  &self.meta.state,
        }
    }
}

impl VisitMut for AsUnitIdentifier {
    fn visit_mut_module(&mut self, module: &mut Module) {
        module.visit_mut_with(&mut self.as_core());
    }

    fn visit_mut_script(&mut self, module: &mut Script) {
        module.visit_mut_with(&mut self.as_core());
    }
}

impl UnitIdentifier<'_> {
    fn visit_stacked(&mut self, id: Option<JsWord>, node: &mut impl VisitMutWith<Self>) {
        self.stack.push(id);
        node.visit_mut_children_with(self);
        self.stack.pop();
    }

    fn is_effector(&self, id: &Id) -> bool {
        let EffectorImport { star, def } = &self.state.borrow().import;

        star.as_ref().is_some_and(|star| *star == *id)
            || def.as_ref().is_some_and(|def| *def == *id)
    }

    fn match_method(&self, node: &Expr) -> Option<EffectorMethod> {
        match node {
            Expr::Ident(ident) => {
                self.state.borrow().aliases.get(&ident.to_id()).cloned()
            }
            Expr::Member(member) => {
                let MemberExpr { obj, prop, .. } = member;
                let (obj, prop) = (obj.as_ident()?, prop.as_ident()?);

                if self.is_effector(&obj.to_id()) {
                    to_method(&prop.sym)
                } else {
                    to_domain_method(&prop.sym)
                }
            }
            _ => None,
        }
    }

    fn match_factory(&self, node: &Expr) -> bool {
        let Expr::Ident(ident) = node else { return false };

        self.state.borrow().factories.contains(&ident.to_id())
    }

    fn transform_method(&self, node: &mut CallExpr) {
        let Callee::Expr(expr) = &node.callee else { return };
        let Some(method) = self.match_method(expr) else { return };

        MethodTransformer {
            mapper: self.mapper,
            config: self.config,
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
                .get_or_insert_with(|| quote_ident!(WITH_FACTORY));

            FactoryTransformer {
                id,

                mapper: self.mapper,
                config: self.config,
                stack: &self.stack,
            }
            .transform(node);
        };
    }
}

impl VisitMut for UnitIdentifier<'_> {
    noop_visit_mut_type!();

    fn visit_mut_member_prop(&mut self, node: &mut MemberProp) {
        let id = node.as_ident().map(|id| id.sym.to_owned());

        self.visit_stacked(id, node);
    }

    fn visit_mut_assign_expr(&mut self, node: &mut AssignExpr) {
        let id: Option<JsWord> = match &node.left {
            PatOrExpr::Pat(pat) => match pat.deref() {
                Pat::Ident(binding) => Some(binding.id.sym.to_owned()),
                _ => None,
            },
            PatOrExpr::Expr(expr) => match expr.deref() {
                Expr::Ident(ident) => Some(ident.sym.to_owned()),
                _ => None,
            },
        };

        self.visit_stacked(id, node);
    }

    fn visit_mut_key_value_prop(&mut self, node: &mut KeyValueProp) {
        let id = node.try_key();

        self.visit_stacked(id, node);
    }

    fn visit_mut_var_declarator(&mut self, node: &mut VarDeclarator) {
        if let Some(expr) = &mut node.init {
            let id: Option<JsWord> = match &node.name {
                Pat::Ident(binding) => Some(binding.id.sym.to_owned()),
                _ => None,
            };

            self.visit_stacked(id, expr);
        }
    }

    fn visit_mut_call_expr(&mut self, node: &mut CallExpr) {
        node.visit_mut_children_with(self);

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

            node.body.insert(first_import, import);
        }
    }
}
