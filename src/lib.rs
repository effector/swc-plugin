use std::rc::Rc;

use swc_core::{
    common::{pass::Optional, sync::Lrc},
    ecma::{
        ast::*,
        visit::{VisitMut, VisitMutWith, visit_mut_pass},
    },
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
};

pub use crate::{config::Config, visitors::VisitorMeta};
use crate::{
    utils::path::filename_from_meta,
    visitors::{analyzer, force_scope, hmr, unit_identifier},
};

mod config;
mod constants;
mod sid;
mod state;
mod utils;
mod visitors;

pub fn effector(meta: VisitorMeta) -> impl VisitMut + Pass {
    let config = &meta.config;

    let chain = (
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
        Optional { enabled: config.hmr.enabled(), visitor: hmr(&meta) },
    );

    visit_mut_pass(chain)
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

    meta.config.check();

    let mut visitor = effector(meta);

    program.visit_mut_with(&mut visitor);

    program
}
