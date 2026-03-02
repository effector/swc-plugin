# Contributing to @effector/swc-plugin

## Development

This plugin supports `swc_core@49.0.0+` and `@swc/core@1.15.0+` with stable Plugin ABI and targets the _latest_ version available. Breaking changes in Plugin ABI by SWC require a major version bump.

### Making Changes

Changelog is managed with `@changesets/cli`. When making changes to the plugin code document them briefly using `pnpm changeset` before committing.

### Testing

#### Fixtures

Plugin Transform is run against a set of JS code samples (located at `tests/fixtures`) directly. Run manually with `cargo test`.

#### Integration

Pre-built `wasm` file with the plugin is loaded into different _host runtimes_ (usually Next.js), and several Playwright-based end-to-end tests are run. These tests are managed manually and should be run after packing to ensure the plugin is compatible with supported host runtimes.

## Releasing

### 1. Version Bump

1. Run `pnpm changeset version`
2. Update `CHANGELOG.md` with notable changes
3. Sync version from `package.json` -> to `Cargo.toml`
4. Run fixture tests with `cargo test`
5. Commit as `release: v{version}` and git tag with `v{version}`

### 2. Build

Build a tarball `cargo make bundle` -> `target/bundle/effector-swc-plugin-{version}.tgz`

### 3. Publish

Run `npm publish target/bundle/effector-swc-plugin-{version}.tgz`
