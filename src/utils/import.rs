use swc_core::ecma::ast::*;

pub(crate) trait Imported {
    fn as_known(&self) -> Option<&str>;
}

impl Imported for ImportNamedSpecifier {
    fn as_known(&self) -> Option<&str> {
        match &self.imported {
            None => Some(&self.local.sym),
            Some(ModuleExportName::Ident(ident)) => Some(ident.sym.as_str()),
            // We currently only match on "well-formed utf-8", so if it isn't – we skip it
            Some(ModuleExportName::Str(string)) => string.value.as_str(),
        }
    }
}
