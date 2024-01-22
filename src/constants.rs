use std::collections::HashSet;

#[derive(PartialEq, Eq, Hash, Clone, Debug)]
#[repr(usize)]
pub enum EffectorMethod {
    Store,
    Event,
    Effect,
    Domain,

    Merge,
    Restore,

    Combine,
    Sample,
    Forward,
    Guard,
    Attach,
    Split,
    CreateApi,

    UseUnit,
    Gate,
}

pub struct Internal {
    pub tracked: HashSet<String>,
    pub factories: HashSet<String>,
}

impl Default for Internal {
    fn default() -> Self {
        Self {
            tracked: HashSet::from_iter(
                [
                    // Core Library
                    "effector",
                    "effector/compat",
                    "effector-root",
                    "effector-root/compat",
                    // View Bindings
                    // React
                    "effector-react",
                    "effector-react/compat",
                    "effector-react/scope",
                    // Solid
                    "effector-solid",
                    "effector-solid/scope",
                ]
                .map(String::from),
            ),

            factories: HashSet::from_iter(
                [
                    "patronum",
                    "atomic-router",
                    "@effector/reflect",
                    "@farfetched/core",
                    "@withease/factories",
                ]
                .map(String::from),
            ),
        }
    }
}
