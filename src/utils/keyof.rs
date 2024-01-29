use swc_core::ecma::{ast::*, atoms::JsWord};

pub trait TryKeyOf {
    fn try_key(&self) -> Option<JsWord>;
}

impl TryKeyOf for KeyValueProp {
    fn try_key(&self) -> Option<JsWord> {
        match self {
            KeyValueProp { key: PropName::Ident(id), .. } => Some(id.sym.to_owned()),
            KeyValueProp { key: PropName::Str(str), .. } => Some(str.value.to_owned()),
            _ => None,
        }
    }
}

impl TryKeyOf for Prop {
    fn try_key(&self) -> Option<JsWord> {
        match self {
            Prop::KeyValue(pair) => pair.try_key(),
            Prop::Shorthand(ident) => Some(ident.sym.to_owned()),
            _ => None,
        }
    }
}
