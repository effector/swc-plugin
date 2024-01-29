use std::ops::Deref;

use swc_core::{
    common::{chain, pass::Optional, sync::Lrc},
    ecma::{
        ast::*,
        visit::{as_folder, Fold, VisitMut, VisitMutWith},
    },
    plugin::{
        metadata::TransformPluginMetadataContextKind, plugin_transform,
        proxies::TransformPluginProgramMetadata,
    },
};

use crate::visitors::{analyzer, force_scope, unit_identifier};
pub use crate::{config::Config, visitors::VisitorMeta};

mod config;
mod constants;
mod sid;
mod state;
mod utils;
mod visitors;

pub fn effector(meta: Lrc<VisitorMeta>) -> impl VisitMut + Fold {
    let config = meta.config.deref();

    let visitor = chain!(
        analyzer(meta.clone()),
        Optional {
            enabled: config.force_scope.reflect(),
            visitor: force_scope::reflect(meta.clone()),
        },
        Optional {
            enabled: config.force_scope.hooks(),
            visitor: force_scope::hooks(meta.clone()),
        },
        unit_identifier(meta.clone()),
    );

    as_folder(visitor)
}

#[plugin_transform]
pub fn process_transform(
    mut program: Program,
    meta: TransformPluginProgramMetadata,
) -> Program {
    let config = serde_json::from_str::<Config>(
        &meta
            .get_transform_plugin_config()
            .expect("effector-plugin config should be set"),
    )
    .expect("effector-plugin config should be valid");

    let meta = VisitorMeta {
        file: meta
            .get_context(&TransformPluginMetadataContextKind::Filename)
            .unwrap_or("unknown".into()),

        config: config.into(),
        mapper: Lrc::from(meta.source_map),

        state: Default::default(),
    };

    let meta = Lrc::from(meta);
    let mut visitor = effector(meta);

    program.visit_mut_with(&mut visitor);

    program
}
