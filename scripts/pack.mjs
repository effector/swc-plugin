import { $, fs, echo, argv, spinner, cd, chalk } from "zx";

import pkg from "../package.json" with { type: "json" };
import versionMap from "../version-map.json" with { type: "json" };

/**
 * @typedef {keyof typeof versionMap} Version
 */

$.verbose = false;
$.quiet = true;

const RUNNING = chalk.bgYellowBright.black("RUNNING");
const DONE = chalk.bgGreen.black("DONE");

const tmpdir = "build";

await fs.mkdirp("target/bundles");

if (!argv["test"] && !argv["build"]) {
  echo(chalk.red`Specify either --build or --test flag.`);
  process.exit(1);
}

await runBase();

for (const swc of Object.keys(versionMap)) await runTag(swc);

// === helpers ===

async function runBase() {
  echo(chalk.gray`==================`);
  echo(`${RUNNING}: @${chalk.bold("latest")}`);

  const env = { ...$.env, CARGO_TARGET_DIR: "target" };

  const $$ = $({ env, verbose: true });

  if (argv["test"]) await test($$);
  if (argv["build"]) await build($$);

  echo(`${DONE}`);
}

async function runTag(/** @type {Version} */ swc) {
  const { tag, override, features: base } = versionMap[swc];
  const features = [...base, "packing"].join(",");

  const env = { ...$.env, CARGO_TARGET_DIR: "../target" };
  const $$ = $({ env, verbose: true });

  echo(chalk.gray`==================`);
  echo(`${RUNNING}: @swc${chalk.bold(swc)}`);

  await prepare(tag);

  cd(tmpdir);

  await install($$, swc, override);

  if (argv["test"]) await test($$, features);
  if (argv["build"]) await build($$, features);

  cd("..");

  await fs.rm(tmpdir, { recursive: true });

  echo(`${DONE}`);
}

/**
 * Prepare environment in `tempdir`
 * @param {string} tag
 */
async function prepare(tag) {
  const version = `${pkg.version}-swc${tag}`;
  const mirror = ["Cargo.toml", "README.md", "LICENSE"];

  await spinner("prepare files", async () => {
    await fs.mkdirp(tmpdir);

    await Promise.all(
      mirror.map((file) =>
        fs.copy(file, `${tmpdir}/${file}`, { overwrite: true })
      )
    );

    await $`cat Build.toml >> ${tmpdir}/Cargo.toml`;
    await $`jq '.version = "${version}"' package.json > ${tmpdir}/package.json`;
  });
}

/**
 * Install dependencies
 *
 * @param {import("zx").Shell} $$
 * @param {string} swc
 * @param {Record<string, string> | undefined} override
 */
async function install($$, swc, override) {
  // swc features as set in Cargo.toml
  const features = "ecma_plugin_transform,ecma_quote,ecma_utils,ecma_parser";

  await spinner("cargo install", async () => {
    await $$`cargo add swc_core@${swc} --features ${features}`;

    if (override) {
      const fixes = Object.entries(override).map((def) => def.join("@"));

      await $$`cargo add ${fixes}`;
    }
  });
}

/**
 * Run plugin tests
 *
 * @param {import("zx").Shell} $$
 * @param {string[] | undefined} features
 */
async function test($$, features) {
  await spinner("cargo test", async () => {
    const flags = [];
    if (features) flags.push(`--features=${features}`);

    await $$`cargo test ${flags}`.catch(
      (out) => (console.error(out.stdall), Promise.reject(out.exitCode))
    );
  });
}

/**
 * Build, optimize and package the plugin
 *
 * @param {import("zx").Shell} $$
 * @param {string | undefined} features
 */
async function build($$, features) {
  const target = "effector_swc_plugin.wasm";
  const built =
    await $$`echo $CARGO_TARGET_DIR/wasm32-wasip1/release/${target}`.text();

  await spinner("cargo build", async () => {
    const flags = [];
    if (features) flags.push(`--features=${features}`);

    await $$`cargo build-plugin --release ${flags}`;

    await fs.move(built.trim(), target, { overwrite: true });
  });

  await spinner("wasm-opt", async () => {
    await $$`wasm-opt --converge --all-features -Os -o ${target} ${target}`;
  });

  await spinner("pnpm pack", async () => {
    await $$`pnpm pack --pack-destination $CARGO_TARGET_DIR/bundles`;
  });
}
