use std::rc::Rc;

use swc_core::ecma::ast::*;

use crate::{
    Config,
    constants::EffectorMethod,
    state::EffectorImport,
    utils::method::{to_domain_method, to_method},
    visitors::{MutableState, VisitorMeta},
};

pub(crate) struct EffectorMatcher {
    pub config: Rc<Config>,
    pub state:  MutableState,
}

impl EffectorMatcher {
    pub fn from_meta(meta: &VisitorMeta) -> Self {
        Self { config: meta.config.clone(), state: meta.state.clone() }
    }

    pub fn try_match(&self, node: &Expr) -> Option<EffectorMethod> {
        match node {
            Expr::Ident(ident) => {
                self.state.borrow().aliases.get(&ident.to_id()).copied()
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

    pub fn track(&mut self, id: Id, method: EffectorMethod) {
        self.state.borrow_mut().aliases.insert(id, method);
    }

    fn is_effector(&self, id: &Id) -> bool {
        let EffectorImport { star, def } = &self.state.borrow().import;

        star.as_ref().is_some_and(|star| *star == *id)
            || def.as_ref().is_some_and(|def| *def == *id)
    }
}
