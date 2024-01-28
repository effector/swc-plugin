use std::path::Path;

use swc_core::{
    common::sync::Lrc,
    ecma::{
        ast::*,
        visit::{Visit, VisitMut, VisitWith},
    },
};

use super::meta::VisitorMeta;
use crate::{
    constants::INTERNAL,
    state::State,
    utils::{to_method, Resolve},
    Config,
};

pub(crate) struct AsAnalyzer {
    meta: Lrc<VisitorMeta>,
}

struct Analyzer<'a> {
    pub config: &'a Config,
    pub state: &'a mut State,

    pub file: &'a String,
}

pub(crate) fn analyzer(meta: Lrc<VisitorMeta>) -> AsAnalyzer {
    AsAnalyzer { meta }
}

impl VisitMut for AsAnalyzer {
    fn visit_mut_module(&mut self, module: &mut Module) {
        let mut visitor = Analyzer {
            file: &self.meta.file,
            config: &self.meta.config,

            state: &mut self.meta.state.borrow_mut(),
        };

        module.visit_with(&mut visitor);
    }

    fn visit_mut_script(&mut self, module: &mut Script) {
        let mut visitor = Analyzer {
            file: &self.meta.file,
            config: &self.meta.config,

            state: &mut self.meta.state.borrow_mut(),
        };

        module.visit_with(&mut visitor);
    }
}

impl Analyzer<'_> {
    fn name_of(import: &ImportNamedSpecifier) -> &str {
        import
            .imported
            .as_ref()
            .map(|v| match v {
                ModuleExportName::Ident(v) => &*v.sym,
                ModuleExportName::Str(v) => &*v.value,
            })
            .unwrap_or(&*import.local.sym)
    }

    fn is_factory(&self, import: &String) -> bool {
        let is_relative = import.starts_with("./") || import.starts_with("../");

        if is_relative {
            let import_path = Path::new(self.file)
                .parent()
                .unwrap()
                .join(import)
                .resolve();

            // Only custom factories define relative paths
            for factory in self
                .config
                .factories
                .iter()
                .filter(|factory| factory.starts_with("./"))
            {
                if Path::new(factory).resolve() == import_path {
                    return true;
                };
            }

            return false;
        }

        // Lax rules for built-in factories (we look at prefix to handle patronum/*)
        if INTERNAL
            .factories
            .iter()
            .any(|factory| import.starts_with(factory))
        {
            return true;
        }

        if self
            .config
            .factories
            .iter()
            .any(|factory| factory == import)
        {
            return true;
        };

        false
    }

    fn match_effector(&mut self, specifier: &ImportSpecifier) {
        match specifier {
            ImportSpecifier::Named(import) => {
                if let Some(method) = to_method(Self::name_of(import)) {
                    self.state.aliases.insert(import.local.to_id(), method);
                }
            }
            ImportSpecifier::Default(def) => self.state.import.def = Some(def.local.to_id()),
            ImportSpecifier::Namespace(star) => self.state.import.star = Some(star.local.to_id()),
        }
    }

    fn match_factory(&mut self, specifier: &ImportSpecifier) {
        match specifier {
            ImportSpecifier::Named(ImportNamedSpecifier { local, .. })
            | ImportSpecifier::Default(ImportDefaultSpecifier { local, .. }) => {
                self.state.factories.insert(local.to_id());
            }
            _ => (/* unsupported */),
        }
    }
}

impl Visit for Analyzer<'_> {
    fn visit_import_decl(&mut self, node: &ImportDecl) {
        let import = node.src.value.to_string();

        if INTERNAL.tracked.contains(&import.as_str()) {
            node.specifiers
                .iter()
                .for_each(|spec| self.match_effector(spec));
        };

        if self.is_factory(&import) {
            node.specifiers
                .iter()
                .for_each(|spec| self.match_factory(spec));
        };
    }
}
