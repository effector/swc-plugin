use swc_core::ecma::ast::*;

pub(crate) trait Imported {
    fn as_known(&self) -> &str;
}

impl Imported for ImportNamedSpecifier {
    fn as_known(&self) -> &str {
        self.imported
            .as_ref()
            .map(|export| export.atom())
            .unwrap_or(&self.local.sym)
    }
}
