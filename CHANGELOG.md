# @effector/swc-plugin

## 0.8.0

### Notable Changes

The support for `@swc/core@1.4.0`, along with Next.js v14, was dropped. If you can't upgrade your runtime, you may continue to use the `v0.7.1` plugin version via `@swc1.4.0` label.

#### Deprecations

For Hot Module Replacement `hmr` option, the value `"none"` has been renamed to `false`, matching the behavior of `effector/babel-plugin`.

- If you were using `hmr: "none"` explicitly, update your configuration to pass `hmr: false` instead.

### Minor Changes

- 5eee6c8: Extend `hmr` configuration to match `effector/babel-plugin`
- d5994bb: Include `effector-action` as a default factory
- 2045a50: Drop support for `@swc/core@1.4.0`

### Patch Changes

- e6d0bb0: Refactor SID method call name drop
- af3821c: Update HMR to use `regional` node for disposal
- 066b616: Bump `swc_core` to latest `v30.1.2` for `@swc/core@1.12.x`

## 0.7.1

### Patch Changes

- b8dd26c: Support `swc_core` up to v27
- b7529b2: Store call name in stack to improve SID insertion performance
- f30515b: Update NodeJS dev dependencies

## 0.7.0

### Notable changes

- The plugin now has support for Hot Module Replacement, allowing to clean up side effects in development.
- The support for older SWC versions (older than 1 year ago) was dropped – if you depend on these versions, you may continue to use `v0.6.1` using old tags.

### Minor Changes

- 534881a: Support for Hot Module Replacement
- 9cb21e8: Support `@swc/core@1.11.x` (issue #31)
- 911fa5e: Drop support for `@swc/core<1.4.0`

### Patch Changes

- b4aade6: Upgraded to Rust 2024 Edition on nightly 2025-02-26
- ced92ca: Update JS dependencies

## 0.6.1

New tag added: `swc1.10.0` for upcoming Next v15.2.0.

### Patch Changes

- 00e8f70: Update `swc_core` up to v13.3.0

## 0.6.0

This release adds support for latest SWC ([compatible](https://plugins.swc.rs/versions/range/19) with `@swc/core >= 1.8.0` & `next >= 15.0.3`).

### Minor Changes

- 8fd8ffe: Support `swc_core` up to v6.0.0

### Patch Changes

- d04f60e: Update `node` dependencies

## 0.5.2

### Patch Changes

- b18c9d4: Fix propagating `name` when chaining methods (#25)

## 0.5.1

### Patch Changes

- cc41d2d: Update latest `swc_core` to 0.106.0
- dc89a22: Improve relative factories handling
- 48113f4: Make default factories check stricter

## 0.5.0

### Notable Changes

- The build process for the plugin now includes an additional optimization pass, reducing the size of unpacked plugin from **2.3 MB** to **just ~900 KB** with no impact on performance.
- To improve NextJS compatibility, a list of supported versions was expanded. The `swc1.4.0` label has been reinstated, and two new labels were added `swc1.6.0` and `swc1.7.0`.
- We added an [Additional documentation](https://github.com/kireevmp/effector-swc-plugin/blob/master/NEXTJS.md) to support NextJS users, sharing details regarding setup and supported labels/versions.

### Minor Changes

- 0cbf8b8: Add `swc_core@0.99.x` plugin build & return `@0.89.x` build
- 8f2f9e5: Add optimization pass to build script (`wasm-opt`)

## 0.4.1

### Patch Changes

- 48b7217: Remove `@effector/reflect` from default factories
- d62f6d0: Update other usages of target to `wasip1`
- f500a14: Remove `name` propagating through nested factories calls

## 0.4.0

### Notable Changes

`swc1.4.0` tag (which is currently also latest) has been combined with `swc1.3.106`.

- If you were using a newer `swc1.4.0` tag to install the plugin, you can either use `latest` or `swc1.3.106` instead
- If you were using an older `swc1.3.106` tag, there're no changes (you'll be using an updated `swc_core`)

`swc1.4.0` in NPM will continue to point to `v0.3.0` release without changes.

### Minor Changes

- 9c29f33: Update dependencies & keep up with SWC updates

### Patch Changes

- 65ac53b: Bump `ahash` to `0.8.11`
- 3378bab: Fix providing `forceScope` for nested `reflect` usage

## 0.3.0

### Minor Changes

- 6519220: Add a new `transformLegacyDomainMethods` option to configure transforming `Domain`'s unit creators

### Patch Changes

- ec44187: Bump dependencies & freeze `swc_core` version

## 0.2.2

### Patch Changes

- 8941803: Fix "AST schema version is not compatible with host's" in `swc_core@0.90` (issue #10)

## 0.2.1

Added support for `swc_core@0.90.0` and `@swc/core@1.4.0`.

### Patch Changes

- 45f4160: Enable support for `swc_core@0.90.0` and `@swc/core@1.4.0`

## 0.2.0

This release brings two key improvements to `forceScope`:

- all hooks from `effector-react` and `effector-solid` are now suppoted: [PR #4](https://github.com/kireevmp/effector-swc-plugin/pull/4).
- React components created with `@effector/reflect` are now supported as well, with the help of `useUnitConfig` _(available in `@effector/reflect` since `v9.0.0`)_: [PR #6](https://github.com/kireevmp/effector-swc-plugin/pull/6).

Additionally, the package size has been reduced from 4.04MB to 2.6MB.

### Minor Changes

- d9f814b: Extend `forceScope` support to `useEvent`, `useStore`, `useStoreMap`, `useGate`
- 9845947: Improve plugin memory management
- 5038c5d: `forceScope` integration with `@effector/reflect`

### Patch Changes

- cce88df: Strip debug symbols in released binary
- 701512b: `forceScope`: optimize `useStoreMap` handling
- 97688ae: Remove explicit parser dependency & simplify build
- 883c5ea: Rework internal constants for factories & imports

## 0.1.1

### Patch Changes

- 4b3c28c: Fix factory import inserted before "use client"
