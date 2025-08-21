---
nav:
  path: /hooks
group:
  path: /
---

# useUrlState

A hook that store the state into url query.

## Install

```bash
npm i @ahooksjs/use-url-state -S
```

> This hook relies on useLocation & useHistory & useNavigate from `react-router`, to use this hook, you need to ensure
>
> 1\. Your project is using `react-router` version 5.0 or 6.0 to manage routing
>
> 2\. Installed @ahooksjs/use-url-state

## Usage

```js
import useUrlState from '@ahooksjs/use-url-state';
```

## Examples

### CodeSandbox Demo

React Router V5: https://codesandbox.io/s/suspicious-feather-cz4e0?file=/App.tsx

React Router V6: https://codesandbox.io/s/autumn-shape-odrt9?file=/App.tsx

### Default usage

<code src="./demo/demo1.tsx" hideActions='["CSB"]' />

### Multi-state management

<code src="./demo/demo2.tsx" hideActions='["CSB"]' />

### Multi-state management (split)

<code src="./demo/demo4.tsx" hideActions='["CSB"]' />

### Custom query-string options

<code src="./demo/demo3.tsx" hideActions='["CSB"]' />

## API

```typescript
const [state, setState] = useUrlState(baseState, options);
```

### Params

| Property  | Description                                                                                    | Type           | Default |
| --------- | ---------------------------------------------------------------------------------------------- | -------------- | ------- |
| baseState | URL search params will be merged into BaseState | `S \| () => S` | -       |
| options   | Url config                                                                                     | `Options`      | -       |

### Options

| Property         | Description                                                                                                 | Type                  | Default  |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | --------------------- | -------- |
| navigateMode     | Type of history navigate mode                                                                               | `'push' \| 'replace'` | `'push'` |
| parseOptions     | [parse](https://github.com/sindresorhus/query-string#parsestring-options) options of `query-string`         | `ParseOptions`        | -        |
| stringifyOptions | [stringify](https://github.com/sindresorhus/query-string#stringifyobject-options) options of `query-string` | `StringifyOptions`    | -        |

### Result

| Property | Description                                  | Type                                              |
| -------- | -------------------------------------------- | ------------------------------------------------- |
| state    | Url query object                             | `object`                                          |
| setState | Same as useState, but state should be object | `(state: S) => void \| (() => ((state: S) => S))` |
