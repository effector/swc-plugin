use swc_core::{common::DUMMY_SP, ecma::ast::*, quote};

pub struct UObject;

impl UObject {
    #[cfg(not(feature = "plugin_compat_v1.4.0"))]
    pub fn prop_key(key: &str) -> PropName {
        PropName::Ident(key.into())
    }

    #[cfg(feature = "plugin_compat_v1.4.0")]
    pub fn prop_key(key: &str) -> PropName {
        PropName::Ident(Ident::new(key.into(), DUMMY_SP))
    }

    pub fn prop(key: &str, value: Expr) -> PropOrSpread {
        let prop = KeyValueProp { key: UObject::prop_key(key), value: Box::new(value) };

        PropOrSpread::Prop(Prop::KeyValue(prop).into())
    }

    pub fn with(props: Vec<(&str, Expr)>) -> ObjectLit {
        ObjectLit {
            span:  DUMMY_SP,
            props: props
                .iter()
                .map(|(key, value)| UObject::prop(key, value.clone()))
                .collect(),
        }
    }

    pub fn insert_and(base: &mut ObjectLit, and: Box<Expr>) {
        let prop = KeyValueProp { key: UObject::prop_key("and"), value: and };

        base.props.push(Prop::KeyValue(prop).into());
    }

    pub fn and_or(and: Expr, or: Expr) -> Expr {
        quote!("{ and: $and, or: $or }" as Expr, and: Expr = and, or: Expr = or)
    }
}
