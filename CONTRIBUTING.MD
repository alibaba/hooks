# Contributing

The following is a set of guidelines for contributing to `ahooks`. Please spend several minutes reading these guidelines before creating an issue or pull request.

## Open Development

All work on ahooks happens directly on [GitHub](https://github.com/alibaba/hooks). Pull requests sent by both core team members and external contributors will go through the same review process.

## New Features

If you want to add a new Hook, we recommend that you first create an issue that describes the scenario and usage of the Hook, see [[RFC] useLockFn](https://github.com/alibaba/hooks/issues/562).

Then you can initialize a new Hook based on an existing Hook.

## Pull Request

We are monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

Before submitting a pull request, please make sure the following is done:

1. Create your branch from the master.

2. If you've fixed a bug or added code that should be tested, add tests!

3. Ensure the test suite passes `pnpm run test`.

## Development Workflow

After cloning `ahooks`, run `pnpm run init` to fetch its dependencies. Then, you can run several commands:

1. `pnpm start` runs `ahooks` website locally.

2. `pnpm run test` runs the complete test suite.

3. `pnpm run build` to build.


## Documentation and package artifacts

Development requires Node.js >= 20.19 and pnpm; CI uses pnpm 12.3.4.
The documentation site uses dumi 2 with utoopack. Development output in `.dumi/dev-dist` is separate from production output in `dist`.

- `pnpm build`: generate ESM, CommonJS, declarations and UMD for both packages, plus hooks metadata.
- `pnpm test:build`: verify module entrypoints, declaration consumers, deep imports and UMD loading.
- `pnpm build:doc` / `pnpm test:doc`: build and verify routes, navigation and assets at the root path.
- `pnpm build:doc-github` / `pnpm test:doc`: verify the `/hooks/` deployment without rewriting documentation sources.

Verify both deployment paths when changing build or site configuration. Use `<code src="./demo/demo1.tsx"></code>` for demos.
