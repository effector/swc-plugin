use std::collections::{HashMap, HashSet};

use swc_core::ecma::ast::{Id, Ident};

use crate::constants::EffectorMethod;

#[derive(Clone, Debug, Default)]
pub struct EffectorImport {
    pub star: Option<Id>,
    pub def: Option<Id>,
}

#[derive(Clone, Debug, Default)]
pub struct State {
    pub aliases: HashMap<Id, EffectorMethod>,
    pub factories: HashSet<Id>,

    pub import: EffectorImport,

    pub factory_import: Option<Ident>,
}
