# Contributing to @effector/swc-plugin

## Developing plugin

The plugin is built to support both _latest_ `swc_core`, with some features to support older SWC versions.

Usually, the development is done using the base plugin, targeting the latest AST version, and the latest _Nightly_ Rust version.

### Changelog

Changelog is managed with `changeset`, and each change to the plugin's core must be logged using `pnpm changeset`.

### Tests

Currently, the plugin is tested in two ways

- **Fixture tests** located in `src/tests/fixtures`.

  The plugin transforms are run directly on samples of JS code. These tests are run during packing process to ensure plugin is functionally working.

  You can run them manually on base plugin with `cargo test`.

- **Integration tests**, run using Playwright.

  Pre-built `wasm` files are loaded into different _host runtimes_, e.g. Next.js. These tests are run manually after packing to ensure published labels are compatible with host runtimes.

## Release process

1. **Bump packages versions**
   1. Run `pnpm changeset version` to generate `CHANGELOG.md` and bump `package.json` version.
   2. Update `CHANGELOG.md` with additional details, e.g. notable/breaking changes.
   3. Manually update the `package.version` field in `Cargo.toml` to match `package.json`.
   4. Check the base plugin using `cargo test`.
   5. Make a release commit `release: v{version}`.
   6. Tag the release with new git tag `v{version}`.
2. **Build packages**
   1. Run build script with `pnpm build --test --build`.
   2. Verify that `target/bundles` contains several tarballs named in form `effector-swc-plugin-{version}-swc{tag}.tgz`.
3. **Publish**
   1. For each labeled tarball, run `npm publish target/bundles/effector-swc-plugin-{version}-swc{tag}.tgz --tag swc{tag}`.
   2. For the _latest_, non-labeled tarball, run `npm publish target/bundles/effector-swc-plugin-{version}.tgz`.
