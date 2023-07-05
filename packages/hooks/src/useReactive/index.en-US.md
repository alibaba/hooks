---
nav:
  path: /hooks
---

## useReactive

It offers data reactivity when manipulating states and views, in which case `useState` is unnecessary for state definition. Modifying properties will automatically lead to view rerendering.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

### Array

<code src="./demo/demo2.tsx" />

### Computed Properties

<code src="./demo/demo3.tsx" />

### Notice

<code  src="./demo/demo4.tsx" />

## API

```js
const state = useReactive(initialValue: Record<string, any>);
```

## Params

| Params       | Description   | Type                  | Default |
| ------------ | ------------- | --------------------- | ------- |
| initialState | Current state | `Record<string, any>` | -       |

## FAQ

### When `useReactive` is used with `Map`, `Set`, it will throw an error or not work?

`useReactive` is not compatible with `Map`, `Set`。

Related issues: [#2239](https://github.com/alibaba/hooks/discussions/2239)
