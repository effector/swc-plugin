use serde::Deserialize;
use swc_core::plugin::errors::HANDLER;

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
    pub hmr: HotReplacement,

    #[serde(default)]
    pub factories: Vec<String>,

    #[serde(
        default = "Configurator::enabled",
        alias = "transformLegacyDomainMethods"
    )]
    pub transform_domain_methods: bool,
}

impl Config {
    pub fn check(&self) {
        if *self.hmr.mode() == HotReplacementMode::Detect {
            HANDLER.with(|handler| {
                handler
                    .struct_err("hmr detection is not supported by swc plugin")
                    .help("consider specifying the mode explicitly")
                    .emit()
            })
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
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

#[derive(Debug, Clone, Deserialize, PartialEq)]
pub enum HotReplacementMode {
    #[serde(rename = "es")]
    ImportMeta,

    #[serde(rename = "cjs")]
    Module,

    #[serde(rename = "none")]
    Disabled,

    #[serde(skip, rename = "detect")]
    Detect,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(untagged)]
pub enum HotReplacement {
    Simple(bool),
    Configured(HotReplacementMode),
}

impl HotReplacement {
    pub fn mode(&self) -> &HotReplacementMode {
        match self {
            Self::Simple(true) => &HotReplacementMode::Detect,
            Self::Simple(false) => &HotReplacementMode::Disabled,
            Self::Configured(mode) => mode,
        }
    }

    pub fn enabled(&self) -> bool {
        let mode = self.mode();

        *mode == HotReplacementMode::ImportMeta || *mode == HotReplacementMode::Module
    }
}

impl Default for HotReplacement {
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
