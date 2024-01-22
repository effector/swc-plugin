use crate::constants::EffectorMethod;

pub(crate) fn to_method(name: &str) -> Option<EffectorMethod> {
    match name {
        "createStore" => Some(EffectorMethod::Store),
        "createEvent" => Some(EffectorMethod::Event),
        "createEffect" => Some(EffectorMethod::Effect),
        "createDomain" => Some(EffectorMethod::Domain),

        "merge" => Some(EffectorMethod::Merge),
        "restore" => Some(EffectorMethod::Restore),

        "combine" => Some(EffectorMethod::Combine),
        "sample" => Some(EffectorMethod::Sample),
        "forward" => Some(EffectorMethod::Forward),
        "guard" => Some(EffectorMethod::Guard),
        "attach" => Some(EffectorMethod::Attach),
        "split" => Some(EffectorMethod::Split),
        "createApi" => Some(EffectorMethod::CreateApi),

        "useUnit" => Some(EffectorMethod::UseUnit),
        "createGate" => Some(EffectorMethod::Gate),
        _ => None,
    }
}

pub(crate) fn to_domain_method(name: &str) -> Option<EffectorMethod> {
    match name {
        "store" | "createStore" => Some(EffectorMethod::Store),
        "event" | "createEvent" => Some(EffectorMethod::Event),
        "effect" | "createEffect" => Some(EffectorMethod::Effect),
        "domain" | "createDomain" => Some(EffectorMethod::Domain),

        _ => None,
    }
}
