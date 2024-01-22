# SWC Plugin for ☄️ Effector

A plugin to enhance your [☄️ Effector](https://effector.dev) experience, just like `effector/babel-plugin`, but _Speedy_.

Can be used for SSR, debugging and testing in SWC-powered projects, like [NextJS](https://nextjs.org) or [Vite's react-swc plugin](https://github.com/vitejs/vite-plugin-react-swc). Strives to be compatible with the [built-in `effector/babel-plugin`](https://effector.dev/en/api/effector/babel-plugin/).

> [!IMPORTANT]
> SWC Plugins are currenlty unstable, and `@swc/core` does not follow semver in plugin compatibility. For more info, see [versioning](#Versioning).

## ⚙️ Get Started

First, install a [compatible](#Versioning) tag of this package:

```bash
$ npm install effector-swc-plugin
# or
$ yarn add effector-swc-plugin
# or
$ pnpm add effector-swc-plugin
```

Second, add this plugin into your SWC configuration (like `.swcrc`):

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "experimental": {
      "plugins": [["effector-swc-plugin", {}]]
    }
  }
}
// You must specify a configuration for a plugin, even if it's empty
```

Third, run your build tools and enjoy.

## Configuration

- `addNames`: `boolean` (default: `true`)

  Add `name` information when calling factories (like `createStore` or `createDomain`).
  Provides excellent debug or QoL information during development/testing, but its best to disable it when using minification.

- `addLoc`: `boolean` (default: `false`)

  Add `loc` (unit location) information to factories' calls. Useful for debugging and when using devtools, like [`effector-logger`](https://github.com/effector/logger).

- `debugSids`: `boolean` (default: `false`)

  Add a file path and unit name to the end of generated SID. Useful for debugging SSR.

- `forceScope`: `boolean` (default: `false`)

  When enabled, injects `forceScope: true` in all [`useUnit`](https://effector.dev/en/api/effector-react/useunit/) calls.

  If `forceScope` is enabled, it makes `useUnit` call to _require_ `Scope` during render (or throw otherwise). This setting completely replaces the requirement for `effector-<view>/scope` imports.

  More about Scope enforcement in [documentation](https://effector.dev/en/api/effector-react/module/scope/#scope-enforcement).

- `factories`: `string[]` (default: `[]`)

  An array of module names or files to treat as factories. Only required for SSR.

  A number of community packages (`patronum`, `@farfetched/code`, etc.) are included by default, and do not require you to set them explicitly.

  If provided with a relative path (a path starting with `./`), plugin will treat this as a local factory residing at a specified path _relative_ to your `.swcrc`. These factories can be imported using _relative_ imports in your code.

  If provided with other path, like a package name or a TypeScript alias, plugin will treat this as an exact import specifier which your code uses. You can not import this factory using a relative path.

  Relative import example:

  ```js
  // file: /.swcrc
  ...
  "factories": ["./src/factory"]
  ...

  // file: /src/factory.ts
  import { createStore } from "effector";

  export const createBooleanStore = () => createStore(true);

  // file: /src/widget/user.ts
  import { createBooleanStore } from "../factory"

  const $boolean = createBooleanStore() /* Treated as a factory! */
  ```

### Known differences with `effector/babel-plugin`

- No support for `importName`

  By default, the plugin supports `effector` (+ `/compat`), `effector-root` (+ `/compat`) and `effector-logger`.
  This should cover you in most of use cases. If you feel a need for this feature, please open an issue!

- No support for `noDefaults`

  This is currently only used by library developers, and will be implemented in the future.
  If you feel you need this feature, please open an issue!

- `reactSsr` replaced by `forceScope`

  `reactSsr` option is deprecated, as well as `/scope` imports. `effector-react` supports SSR by default since `effector@23`.

  If you want to enforce that [`Scope`](https://effector.dev/en/api/effector/Scope) is never lost in your components, `forceScope` option in the plugin will do the trick.

## Versioning

Because SWC plugins are unstable and experimental, breaking changes can happen in minor/patch releases of `@swc/core` or underlying `swc_core` Rust library.

This package will do its best and specify the correct `@swc/core` in its `peerDependencies`, so when you use the wrong version, it should say so.

To work around breaking changes, this package publishes different ['labels'](https://semver.org/#spec-item-9) for different corresponding `@swc/core` ranges. To choose an appropriate label, pick your `@swc/core` / `NextJS` version from [the list](https://www.npmjs.com/package/effector-swc-plugin?activeTab=versions).

_Always pin your `@swc/core` and this plugin version for stable behavior._

Choosing the Right Plugin Version:

- Use `@0.x.x` (no label) for the latest `@swc/core`.
- Use `@0.x.x-swc1.x.x` for specific `@swc/core` versions.

**Example:**

| Available Plugin Version       | Compatible `@swc/core` Versions |
| ------------------------------ | ------------------------------- |
| `@0.x.x-swc1.3.49`             | `1.3.49` to `1.3.57`            |
| `@0.x.x-swc1.3.58`             | `1.3.58` to `1.3.61`            |
| `@0.x.x-swc1.3.62` or `@0.x.x` | `1.3.62`                        |

Also, see SWC Documentation "[Selecting the version](https://swc.rs/docs/plugin/selecting-swc-core)" for detailed info on plugin compatibility.
