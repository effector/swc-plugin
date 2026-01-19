use swc_core::ecma::ast::*;
#[cfg(not(feature = "plugin_compat_v1.12.0"))]
use {std::borrow::Cow, swc_core::atoms::Atom};

pub(crate) trait Imported {
    #[cfg(not(feature = "plugin_compat_v1.12.0"))]
    fn as_known<'a>(&'a self) -> Cow<'a, Atom>;
    #[cfg(feature = "plugin_compat_v1.12.0")]
    fn as_known(&self) -> &str;
}

impl Imported for ImportNamedSpecifier {
    #[cfg(not(feature = "plugin_compat_v1.12.0"))]
    fn as_known<'a>(&'a self) -> Cow<'a, Atom> {
        self.imported
            .as_ref()
            .map(|export| export.atom())
            .unwrap_or(Cow::Borrowed(&self.local.sym))
    }
    #[cfg(feature = "plugin_compat_v1.12.0")]
    fn as_known(&self) -> &str {
        self.imported
            .as_ref()
            .map(|export| export.atom())
            .unwrap_or(&self.local.sym)
    }
}
