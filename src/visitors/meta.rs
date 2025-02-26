use std::{cell::RefCell, rc::Rc};

use swc_core::common::{SourceMapper, sync::Lrc};

use crate::{config::Config, state::State};

pub struct VisitorMeta {
    pub state: MutableState,

    pub config: Rc<Config>,
    pub mapper: Lrc<dyn SourceMapper>,

    pub file: String,
}

pub type MutableState = Rc<RefCell<State>>;
