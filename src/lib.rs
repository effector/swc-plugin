use std::rc::Rc;

use swc_core::{
    common::{chain, pass::Optional, sync::Lrc},
    ecma::{
        ast::*,
        visit::{as_folder, Fold, VisitMut, VisitMutWith},
    },
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
};

pub use crate::{config::Config, visitors::VisitorMeta};
use crate::{
    utils::path::filename_from_meta,
    visitors::{analyzer, force_scope, unit_identifier},
};

mod config;
mod constants;
mod sid;
mod state;
mod utils;
mod visitors;

pub fn effector(meta: VisitorMeta) -> impl VisitMut + Fold {
    let config = &meta.config;

    let visitor = chain!(
        analyzer(&meta),
        Optional {
            enabled: config.force_scope.reflect(),
            visitor: force_scope::reflect(&meta),
        },
        Optional {
            enabled: config.force_scope.hooks(),
            visitor: force_scope::hooks(&meta),
        },
        unit_identifier(&meta),
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
        file: filename_from_meta(&meta).unwrap_or("unknown.js".into()),

        config: Rc::new(config),
        mapper: Lrc::from(meta.source_map),

        state: Default::default(),
    };

    let mut visitor = effector(meta);

    program.visit_mut_with(&mut visitor);

    program
}
