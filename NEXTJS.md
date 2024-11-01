# @effector/swc-plugin with Next.js

## Get Started

> [!TIP]
> For a correct Next.js and Effector integration we highly recommend using an official [`@effector/next`](https://github.com/effector/next/#readme) bindings package.
>
> However, this plugin (or a [built-in `effector/babel-plugin`](https://effector.dev/api/effector/babel-plugin/)) is required for `@effector/next` to work.

To set up the `@effector/swc-plugin` for your Next.js project, follow these steps:

1. **Determine a compatible plugin version**

   To pick a compatible plugin version, you need to know the version of Next.js you are using. You can easily find it using your package manager, e.g.

   ```bash
   $ pnpm list next
   dependencies:
   next 14.2.5 # <---
   ```

   Then, refer to the table in the [official documentation](https://effector.dev/api/effector/swc-plugin/#installation-versioning) to find the correct version of the plugin.

1. **Install the plugin**

   Use your preferred package manager to install the plugin. Ensure you **pin**[^1] both Next.js and the plugin by using an exact version specifier and a flag.

   ```bash
   $ npm install --save-exact next@<nextjs-version> @effector/swc-plugin@<plugin-version>
   # or
   $ yarn add --exact next@<nextjs-version> @effector/swc-plugin@<plugin-version>
   # or
   $ pnpm add --save-exact next@<nextjs-version> @effector/swc-plugin@<plugin-version>
   ```

1. **Add the plugin to your configuration**

   Update your Next.js configuration file `next.config.js` to include the plugin in the `experimental.swcPlugins` field.

   ```ts
   // next.config.js
   const nextConfig = {
     experimental: {
       // even if empty, pass an options object `{}` to the plugin
       swcPlugins: [["@effector/swc-plugin", {}]],
     },
   };
   ```

   For a full list of configuration options, refer to the [official documentation](https://effector.dev/api/effector/swc-plugin/).

Now you're using a blazing-fast `@effector/swc-plugin` in your Next.js project!

## Plugin Compatibility

> [!IMPORTANT]
> This SWC plugin, along with all other SWC plugins, is currently considered experimental and unstable.
>
> SWC and Next.js might not follow semver when it comes to plugin compatibility.

Please refer to the [versioning section](https://effector.dev/api/effector/swc-plugin/#installation-versioning) in the 📚 official documentation.

To ensure compatibility with each release of `@effector/swc-plugin`, we perform multiple integration tests using a sample Next.js app.

### Integration Testing

To ensure our plugin is compatible with various Next.js versions, we conduct multiple integration tests, including:

- Starting a development server and loading the AST into the plugin
- Verifying the generation of [SID](https://effector.dev/explanation/sids/)s and unit names
- Testing with App Router and `async` Components (via `@effector/next`)
- Testing with Pages Router and `getServerSideProps` (via `@effector/next`)

These tests are executed using [Playwright](https://github.com/Microsoft/playwright) for each setup:

| Next.js Version          | Plugin Version | Bundler[^2] |
| ------------------------ | -------------- | ----------- |
| `next@13.4.8`            | `swc1.3.63`    | `webpack`   |
| `next@14.1.3`            | `swc1.3.63`    | `webpack`   |
| `next@14.1.3`            | `swc1.3.63`    | `turbopack` |
| `next@14.2.0`            | `swc1.4.0`     | `webpack`   |
| `next@14.2.0`            | `swc1.4.0`     | `turbopack` |
| `next@14.2.14`           | `swc1.4.0`     | `webpack`   |
| `next@14.2.14`           | `swc1.4.0`     | `turbopack` |
| `next@15.0.0-canary.37`  | `swc1.6.0`     | `webpack`   |
| `next@15.0.0-canary.37`  | `swc1.6.0`     | `turbopack` |
| `next@15.0.0-canary.116` | `swc1.6.0`     | `webpack`   |
| `next@15.0.0-canary.116` | `swc1.6.0`     | `turbopack` |
| `next@15.0.2`            | `swc1.7.0`     | `webpack`   |
| `next@15.0.2`            | `swc1.7.0`     | `turbopack` |

[^1]:
    Failing to pin a version may result in unintentional update to one of the packages (either plugin or Next.js), which _will_ make your setup broken.
    These issues are hard to detect due to Next.js producing no meaningful error messages when a plugin fails to load.

[^2]:
    Next.js includes an experimental [`turbopack`](https://nextjs.org/docs/architecture/turbopack) bundler, which can be enabled using the `--turbo` CLI flag when running Next.js. `turbopack` uses `swc` internally.

    Note that Turbopack is not feature-complete. Some features of this plugin **do not work correctly** when using `turbopack`.
