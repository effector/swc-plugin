use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Config {
    #[serde(default = "Configurator::enabled")]
    pub add_names: bool,

    #[serde(default = "Configurator::disabled")]
    pub add_loc: bool,

    #[serde(default)]
    pub force_scope: ForceScope,

    #[serde(default = "Configurator::disabled")]
    pub debug_sids: bool,

    #[serde(default)]
    pub factories: Vec<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ForceScopeConfig {
    #[serde(default = "Configurator::enabled")]
    hooks: bool,

    #[serde(default = "Configurator::enabled")]
    reflect: bool,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(untagged)]
pub enum ForceScope {
    Simple(bool),
    Configured(ForceScopeConfig),
}

impl ForceScope {
    pub fn hooks(&self) -> bool {
        match self {
            Self::Simple(value) => *value,
            Self::Configured(cfg) => cfg.hooks,
        }
    }

    pub fn reflect(&self) -> bool {
        match self {
            Self::Simple(value) => *value,
            Self::Configured(cfg) => cfg.reflect,
        }
    }
}

impl Default for ForceScope {
    fn default() -> Self {
        Self::Simple(false)
    }
}

struct Configurator;
impl Configurator {
    fn enabled() -> bool {
        true
    }

    fn disabled() -> bool {
        false
    }
}
