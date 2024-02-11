# effector-swc-plugin

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
