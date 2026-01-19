use std::borrow::Cow;

use swc_core::{atoms::Atom, ecma::ast::*};

pub(crate) trait Imported {
    fn as_known<'a>(&'a self) -> Cow<'a, Atom>;
}

impl Imported for ImportNamedSpecifier {
    fn as_known<'a>(&'a self) -> Cow<'a, Atom> {
        self.imported
            .as_ref()
            .map(|export| export.atom())
            .unwrap_or(Cow::Borrowed(&self.local.sym))
    }
}
