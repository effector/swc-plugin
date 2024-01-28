use std::{
    fs::read_to_string,
    path::{Path, PathBuf},
};

use effector_swc_plugin::{effector, Config, VisitorMeta};
use serde::Deserialize;
use swc_core::{
    common::{chain, sync::Lrc, Mark},
    ecma::{
        parser::Syntax,
        transforms::{
            base::resolver,
            testing::{test_fixture, Tester},
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
    __file: Option<String>,
}

fn fixture(plugin_config: PathBuf) {
    let dir = plugin_config.parent().unwrap();
    let input = find_input(dir);

    let syntax = Syntax::Es(Default::default());

    let raw_config = read_to_string(plugin_config.clone()).expect("failed to read config.json");
    let config = serde_json::from_str::<Config>(&raw_config).unwrap();
    let internal = serde_json::from_str::<TestConfig>(&raw_config).unwrap();

    test_fixture(
        syntax,
        &|tester: &mut Tester| {
            let meta = VisitorMeta {
                config: config.clone().into(),
                mapper: tester.cm.clone(),

                state: Default::default(),

                file: internal.__file.to_owned().unwrap_or("input.js".into()),
            };

            let meta = Lrc::from(meta);

            chain!(
                resolver(Mark::new(), Mark::new(), false),
                effector(meta.clone())
            )
        },
        &input,
        &dir.join("output.js"),
        Default::default(),
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
