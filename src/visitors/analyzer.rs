use std::{path::Path, rc::Rc};

use swc_core::ecma::{ast::*, visit::VisitMut};

use crate::{
    Config,
    constants::INTERNAL,
    utils::{Resolve, to_method},
    visitors::{MutableState, VisitorMeta},
};

struct Analyzer {
    pub config: Rc<Config>,
    pub state:  MutableState,
    pub file:   String,
}

pub(crate) fn analyzer(meta: &VisitorMeta) -> impl VisitMut + use<> {
    Analyzer {
        config: meta.config.clone(),
        state:  meta.state.clone(),
        file:   meta.file.clone(),
    }
}

impl Analyzer {
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
            let import_path = Path::new(&self.file)
                .parent()
                .unwrap()
                .join(import)
                .resolve();

            // Only custom factories define relative paths
            return self
                .config
                .factories
                .iter()
                .filter(|factory| factory.starts_with("./"))
                .map(|factory| Path::new(factory).resolve())
                .any(|factory| *factory == import_path);
        }

        // Lax rules for built-in factories (we look at prefix to handle patronum/*)
        if INTERNAL
            .factories
            .iter()
            .filter_map(|&factory| import.strip_prefix(factory))
            .any(|import| import.is_empty() || import.starts_with('/'))
        {
            return true;
        }

        // Strict rules for custom factories
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
        let mut state = self.state.borrow_mut();

        match specifier {
            ImportSpecifier::Named(import) => {
                if let Some(method) = to_method(Self::name_of(import)) {
                    state.aliases.insert(import.local.to_id(), method);
                }
            }
            ImportSpecifier::Default(def) => state.import.def = Some(def.local.to_id()),
            ImportSpecifier::Namespace(star) => {
                state.import.star = Some(star.local.to_id())
            }
        }
    }

    fn match_factory(&mut self, specifier: &ImportSpecifier) {
        match specifier {
            ImportSpecifier::Named(ImportNamedSpecifier { local, .. })
            | ImportSpecifier::Default(ImportDefaultSpecifier { local, .. }) => {
                self.state.borrow_mut().factories.insert(local.to_id());
            }
            _ => (/* unsupported */),
        }
    }
}

impl VisitMut for Analyzer {
    fn visit_mut_import_decl(&mut self, node: &mut ImportDecl) {
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
