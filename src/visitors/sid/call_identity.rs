use swc_core::{
    common::Loc,
    ecma::{
        ast::{Expr, ObjectLit},
        atoms::Atom,
    },
};

use crate::{Config, sid::StableIdentifer, utils::UObject};

const INLINE_UNIT: &str = "inlineUnit";

pub(super) struct CallIdentity {
    pub name:   Option<String>,
    pub file:   String,
    pub line:   usize,
    pub column: usize,
}

impl CallIdentity {
    fn to_name(atom: &Option<Atom>) -> Option<String> {
        atom.as_ref().map(|value| value.to_string())
    }

    fn loc(&self) -> ObjectLit {
        UObject::with(vec![
            ("file", self.file.to_owned().into()),
            ("line", self.line.into()),
            ("column", self.column.into()),
        ])
    }

    fn id(&self, debug: bool) -> String {
        StableIdentifer {
            name: self.name.as_deref().unwrap_or(INLINE_UNIT),

            file: &self.file,
            line: self.line,
            column: self.column,

            debug,
        }
        .to_sid()
    }

    pub fn new(atom: &Option<Atom>, loc: Loc) -> CallIdentity {
        Self {
            name:   Self::to_name(atom),
            file:   loc.file.name.to_string(),
            line:   loc.line,
            column: loc.col_display,
        }
    }

    pub fn generate(&self, config: &Config) -> ObjectLit {
        let mut props: Vec<(&str, Expr)> = Vec::new();

        props.push(("sid", self.id(config.debug_sids).into()));

        if self.name.is_some() && config.add_names {
            props.push(("name", self.name.clone().unwrap().into()));
        }

        if config.add_loc {
            props.push(("loc", self.loc().into()))
        }

        UObject::with(props)
    }
}
