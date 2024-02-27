use std::rc::Rc;

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
use crate::{
    constants::EffectorMethod,
    state::EffectorImport,
    utils::{to_domain_method, to_method, TryKeyOf},
    visitors::{MutableState, VisitorMeta},
    Config,
};

mod call_identity;
mod factory;
mod method;

struct UnitIdentifier {
    pub config: Rc<Config>,
    pub mapper: Lrc<dyn SourceMapper>,
    pub state:  MutableState,

    stack: Vec<Option<JsWord>>,
    factory_import: Option<Ident>,
}

pub(crate) fn unit_identifier(meta: &VisitorMeta) -> impl VisitMut {
    UnitIdentifier {
        stack: Vec::new(),
        factory_import: None,

        config: meta.config.clone(),
        mapper: meta.mapper.clone(),
        state:  meta.state.clone(),
    }
}

impl UnitIdentifier {
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
                self.state.borrow_mut().aliases.get(&ident.to_id()).cloned()
            }
            Expr::Member(member) => {
                let MemberExpr { obj, prop, .. } = member;
                let (obj, prop) = (obj.as_ident()?, prop.as_ident()?);

                if self.is_effector(&obj.to_id()) {
                    to_method(&prop.sym)
                } else if self.config.transform_domain_methods {
                    to_domain_method(&prop.sym)
                } else {
                    None
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
            mapper: self.mapper.as_ref(),
            config: self.config.as_ref(),
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
                mapper: self.mapper.as_ref(),
                config: self.config.as_ref(),
                stack: &self.stack,

                id,
            }
            .transform(node);
        };
    }
}

impl VisitMut for UnitIdentifier {
    noop_visit_mut_type!();

    #[cfg(not(feature = "plugin_compat_v1"))]
    fn visit_mut_assign_expr(&mut self, node: &mut AssignExpr) {
        let id: Option<JsWord> = match &node.left {
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

    #[cfg(feature = "plugin_compat_v1")]
    fn visit_mut_assign_expr(&mut self, node: &mut AssignExpr) {
        use std::ops::Deref;

        let id: Option<JsWord> = match &node.left {
            PatOrExpr::Pat(pat) => match pat.deref() {
                Pat::Ident(binding) => Some(binding.id.sym.to_owned()),
                Pat::Expr(expr) => match expr.deref() {
                    Expr::Ident(id) => Some(id.sym.to_owned()),
                    Expr::Member(member) => member
                        .prop
                        .as_ident()
                        .and_then(|id| Some(id.sym.to_owned())),
                    _ => None,
                },
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
