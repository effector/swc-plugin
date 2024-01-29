#[derive(PartialEq, Eq, Hash, Clone, Debug)]
#[repr(usize)]
pub enum EffectorMethod {
    // unit creators
    Store,
    Event,
    Effect,
    Domain,

    Merge,
    Restore,

    // effector operators
    Combine,
    Sample,
    Forward,
    Guard,
    Attach,
    Split,
    CreateApi,

    // view library hooks
    UseEvent,
    UseGate,
    UseList,
    UseStore,
    UseStoreMap,
    UseUnit,
    // view library units
    Gate,

    // reflect
    Reflect,
    ReflectList,
    ReflectVariant,
}

pub(crate) struct Internal {
    pub tracked:   [&'static str; 10],
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
                // Reflect
                "@effector/reflect",
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
