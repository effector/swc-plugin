use std::{
    fs::read_to_string,
    path::{Path, PathBuf},
};

use effector_swc_plugin::{Config, VisitorMeta, effector};
use serde::Deserialize;
#[cfg(not(feature = "plugin_compat_v1.7.0"))]
use swc_core::ecma::ast::Pass;
#[cfg(feature = "plugin_compat_v1.7.0")]
use swc_core::ecma::visit::Fold;
use swc_core::{
    common::Mark,
    ecma::{
        parser::Syntax,
        transforms::{
            base::resolver,
            testing::{FixtureTestConfig, Tester, test_fixture},
        },
    },
};

fn find_input(dir: &Path) -> PathBuf {
    let mut curr = dir;

    loop {
        let candidate = curr.join("input.js");

        if candidate.exists() {
            break candidate;
        }

        curr = curr.parent().expect("`input.js` should be in the tree.");
    }
}

#[derive(Deserialize)]
struct TestConfig {
    __file:     Option<String>,
    __can_fail: Option<bool>,
}

fn fixture(plugin_config: PathBuf) {
    let dir = plugin_config.parent().unwrap();
    let input = find_input(dir);

    let syntax = Syntax::Es(Default::default());

    let raw_config =
        read_to_string(plugin_config.clone()).expect("failed to read config.json");
    let config = serde_json::from_str::<Config>(&raw_config).unwrap();
    let internal = serde_json::from_str::<TestConfig>(&raw_config).unwrap();

    let can_fail = internal.__can_fail.unwrap_or(false);

    let fixture_config =
        FixtureTestConfig { allow_error: can_fail, ..Default::default() };

    #[cfg(not(feature = "plugin_compat_v1.7.0"))]
    fn plugin(meta: VisitorMeta) -> impl Pass {
        (resolver(Mark::new(), Mark::new(), false), effector(meta))
    }

    #[cfg(feature = "plugin_compat_v1.7.0")]
    fn plugin(meta: VisitorMeta) -> impl Fold {
        use swc_core::common::chain;

        chain!(resolver(Mark::new(), Mark::new(), false), effector(meta))
    }

    test_fixture(
        syntax,
        &|tester: &mut Tester| {
            config.check();

            let meta = VisitorMeta {
                config: config.clone().into(),
                mapper: tester.cm.clone(),

                state: Default::default(),

                file: internal.__file.to_owned().unwrap_or("input.js".into()),
            };

            plugin(meta)
        },
        &input,
        &dir.join("output.js"),
        fixture_config,
    )
}

#[cfg(not(feature = "packing"))]
#[testing::fixture("tests/fixtures/**/config.json")]
fn run_local(plugin_config: PathBuf) {
    fixture(plugin_config);
}

#[cfg(feature = "packing")]
#[testing::fixture("../tests/fixtures/**/config.json")]
fn run_remote(plugin_config: PathBuf) {
    fixture(plugin_config);
}
