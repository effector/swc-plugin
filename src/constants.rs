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

pub(crate) struct Internal {
    pub tracked: [&'static str; 9],
    pub factories: [&'static str; 5],
}

pub(crate) static INTERNAL: Internal = Internal::default();

impl Internal {
    const fn default() -> Self {
        Self {
            tracked: [
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
            ],

            factories: [
                "patronum",
                "atomic-router",
                "@effector/reflect",
                "@farfetched/core",
                "@withease/factories",
            ],
        }
    }
}
