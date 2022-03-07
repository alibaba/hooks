---
nav:
  path: /hooks
---

## useReactive

It offers data reactivity when manipulating states and views, in which case `useState`  is unnecessary for state definition. Modifying properties will automatically lead to view rerendering.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

### Array

<code src="./demo/demo2.tsx" />

### Computed Properties

<code src="./demo/demo3.tsx" />

### Provides the same functionality as useSafeState, state changes within asynchronous callbacks after component uninstallation are no longer executed, avoiding memory leaks caused by updating state after component uninstallation.
<code src="./demo/demo5.tsx"/>

### notice

<code  src="./demo/demo4.tsx" />

## API

```js
const state = useReactive(
  initialState: Record<string, any>,
  options?: {
    safe?: boolean
  }
);
```

## Params

| Params       | Description   | Type                  | Default |
|--------------|---------------|-----------------------|---------|
| initialState | Current state | `Record<string, any>` | -       |


| Params         | Description           | Type                  | Default |
|--------------|----------------|-----------------------|--------|
| initialState | Current state | `Record<string, any>` | -      |
| options | Configure state behavior within asynchronous callbacks after component unloading    | `Record<string, boolean>`  | -            |

### Options

| Params      | Description                     | Type      | Default  |
|-----------|--------------------------|-----------|---------|
| safe      | Sets whether state changes need to be performed in asynchronous callbacks after component uninstallation                     | `boolean` | `false` |

