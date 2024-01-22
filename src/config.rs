use serde::Deserialize;

#[derive(Debug, Clone, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Config {
    #[serde(default = "Configurator::enabled")]
    pub add_names: bool,

    #[serde(default = "Configurator::disabled")]
    pub add_loc: bool,

    #[serde(default = "Configurator::disabled")]
    pub force_scope: bool,

    #[serde(default = "Configurator::disabled")]
    pub debug_sids: bool,

    #[serde(default)]
    pub factories: Vec<String>,
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
