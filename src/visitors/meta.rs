use std::cell::RefCell;

use swc_core::common::{sync::Lrc, SourceMapper};

use crate::{config::Config, state::State};

pub struct VisitorMeta {
    pub state: Lrc<RefCell<State>>,

    pub config: Lrc<Config>,
    pub mapper: Lrc<dyn SourceMapper>,

    pub file: String,
}
