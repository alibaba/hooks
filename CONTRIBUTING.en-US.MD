# Contributing

> Refer to the ant design [Contributing](https://ant.design/docs/react/contributing)

The following is a set of guidelines for contributing to `ahooks`. Please spend several minutes reading these guidelines before you create an issue or pull request.

## Open Development

All work on ahooks happens directly on [GitHub](https://github.com/alibaba/hooks). Both core team members and external contributors send pull requests which go through the same review process.

## Branch Organization

we maintain two branches, master and feature. If you send a bugfix pull request, please do it against the master branch, if it's a feature pull request, please do it against the feature branch.

## New Features

If you want to add a new Hook，we recommend that you first create an issue that describes the application scenario and usage of the Hook, see [[RFC] useLockFn](https://github.com/alibaba/hooks/issues/562)。

Then you can initialize a new Hook based on an existing Hook.

## Pull Request

We are monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

Before submitting a pull request, please make sure the following is done:

1. create your branch from the [correct branch](#Branch-Organization).

2. If you've fixed a bug or added code that should be tested, add tests!

3. Ensure the test suite passes `npm run test`。

## Development Workflow

After cloning antd, run `npm install` to fetch its dependencies. Then, you can run several commands:

1. `npm start` runs `ahooks` website locally。

2. `npm run test` runs the complete test suite。

3. `npm run build` creates UMD build of `ahooks`。
