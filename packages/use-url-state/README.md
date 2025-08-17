# useUrlState

A hook that stores the state into url query parameters.

## Installing

Inside your React project directory, run the following:

```bash
yarn add @ahooksjs/use-url-state -S
```

Or with npm:

```bash
npm install @ahooksjs/use-url-state -S
```

Or with pnpm

```bash
pnpm add @ahooksjs/use-url-state
```

Or with Bun

```bash
bun add @ahooksjs/use-url-state
```

## Example

```javascript
import useUrlState from '@ahooksjs/use-url-state';

const [state, setState] = useUrlState({ demoCount: '1' });
```

## Documentation

https://ahooks.js.org/hooks/state/use-url-state
