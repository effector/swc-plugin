use swc_core::ecma::{ast::Ident, utils::private_ident};

pub(crate) struct UniqueId;

impl UniqueId {
    const PREFIX: &str = "_effector$";

    pub fn ident(name: &str) -> Ident {
        let id = Self::PREFIX.to_owned();
        private_ident!(id + name)
    }
}
