# NextJS

## Get Started

> [!TIP]
> For a correct NextJS and Effector integration we highly recommend using an official [`@effector/next`](https://github.com/effector/next/#readme) bindings package.
>
> However, this plugin (or a [built-in `effector/babel-plugin`](https://effector.dev/en/api/effector/babel-plugin/)) is required for `@effector/next` to work.

To set up the `effector-swc-plugin` for your NextJS project, follow these steps:

1. **Determine a compatible plugin version**

   To pick a compatible plugin version, you need to know the version of NextJS you are using. You can easily find it using your package manager, e.g.

   ```bash
   $ pnpm list next
   dependencies:
   next 14.2.5 # <---
   ```

   Then, refer to the table in the [Plugin Compatibility](#Plugin-Compatibility) section to find the compatible version of the plugin.

1. **Install the plugin**

   Use your package manager to install the plugin. Ensure you **pin**[^1] both NextJS and the plugin by using an exact version specifier and a flag.

   ```bash
   $ npm install --save-exact next@<nextjs-version> effector-swc-plugin@<plugin-version>
   # or
   $ yarn add --exact next@<nextjs-version> effector-swc-plugin@<plugin-version>
   # or
   $ pnpm add --save-exact next@<nextjs-version> effector-swc-plugin@<plugin-version>
   ```

1. **Add the plugin to your configuration**

   Update your NextJS configuration file `next.config.js` to include the plugin in the `experimental.swcPlugins` field.

   ```js
   // next.config.js
   module.exports = {
     experimental: {
       // make sure to pass options `{}` to
       // the plugin even if its empty
       swcPlugins: [["effector-swc-plugin", {}]],
     },
   };
   ```

   For a full list of configuration options, refer to the [`README`](https://github.com/kireevmp/effector-swc-plugin/#readme) documentation.

Now you're using a blazing-fast `effector-swc-plugin` in your NextJS project!

## Plugin Compatibility

> [!IMPORTANT]
> SWC Plugins are currenlty **unstable** and experimental, NextJS and SWC **do not follow semver** in plugin compatibility.

Because of this, breaking changes can happen in minor/patch releases of `@swc/core`, NextJS or underlying `swc_core` Rust library.
To work around breaking changes, this package publishes multiple stable ['labels'](https://semver.org/#spec-item-9) for different corresponding NextJS versions.

To choose an appropriate label, choose your NextJS version on the left, and install the plugin using a label from the right[^2].

| NextJS Version Range           | Plugin Version |
| ------------------------------ | -------------- |
| `next@13.4.8` to `next@14.1.4` | `swc1.3.63`    |
| `next@14.2.0` to `next@14.2.5` | `swc1.4.0`     |
| `next@15.0.0-canary.37` and up | `swc1.6.0`     |

To ensure compatibility with each release of `effector-swc-plugin`, we perform multiple integration tests using a sample NextJS app.

### Integration Testing

To ensure our plugin is compatible with various NextJS versions, we conduct multiple integration tests, including:

- Starting a development server and loading the AST into the plugin
- Verifying the generation of [SID](https://effector.dev/en/explanation/sids/)s and unit names
- Testing with App Router and `async` Components (via `@effector/next`)
- Testing with Pages Router and `getServerSideProps` (via `@effector/next`)

These tests are executed using [Playwright](https://github.com/Microsoft/playwright) for each setup:

| NextJS Version          | Plugin Version | Bundler[^3] |
| ----------------------- | -------------- | ----------- |
| `next@13.4.8`           | `swc1.3.63`    | `webpack`   |
| `next@14.1.3`           | `swc1.3.63`    | `webpack`   |
| `next@14.1.3`           | `swc1.3.63`    | `turbopack` |
| `next@14.2.0`           | `swc1.4.0`     | `webpack`   |
| `next@14.2.0`           | `swc1.4.0`     | `turbopack` |
| `next@14.2.5`           | `swc1.4.0`     | `webpack`   |
| `next@14.2.5`           | `swc1.4.0`     | `turbopack` |
| `next@15.0.0-canary.37` | `swc1.6.0`     | `webpack`   |
| `next@15.0.0-canary.37` | `swc1.6.0`     | `turbopack` |

[^1]:
    Failing to pin a version may result in unintentional update to one of the packages (either plugin or NextJS), which _will_ make your setup broken.
    These issues are hard to detect due to NextJS producing no meaningful error messages when a plugin fails to load.

[^2]: Additional compatibility information can be found in SWC documentation <https://swc.rs/docs/plugin/selecting-swc-core>.
[^3]:
    NextJS includes an experimental [`turbopack`](https://nextjs.org/docs/architecture/turbopack) bundler, which can be enabled using the `--turbo` CLI flag when running NextJS. `turbopack` uses `swc` internally.
    We test plugin compatibility with both bundlers, so you can use either one confidently.
