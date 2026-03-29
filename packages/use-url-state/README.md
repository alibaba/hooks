# useUrlState

A hook that stores the state into url query parameters.

> Important
>
> This package is now published as `@ahooks.js/use-url-state`.
>
> If you were using the previous package name, please migrate to the new package name as soon as possible.

## Installing

Inside your React project directory, run the following:

```bash
yarn add @ahooks.js/use-url-state -S
```

Or with npm:

```bash
npm install @ahooks.js/use-url-state -S
```

Or with pnpm

```bash
pnpm add @ahooks.js/use-url-state
```

Or with Bun

```bash
bun add @ahooks.js/use-url-state
```

## Example

```javascript
import useUrlState from '@ahooks.js/use-url-state';

const [state, setState] = useUrlState({ demoCount: '1' });
```

## Documentation

https://ahooks.js.org/hooks/state/use-url-state
