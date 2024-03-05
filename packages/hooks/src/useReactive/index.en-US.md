---
title: useReactive
nav: Hooks
group:
  title: Advanced
  order: 7
order: 7
toc: content
demo:
  cols: 2
---

## useReactive

It offers data reactivity when manipulating states and views, in which case `useState` is unnecessary for state definition. Modifying properties will automatically lead to view rerendering.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>
<code src="./demo/demo4.tsx"></code>

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
