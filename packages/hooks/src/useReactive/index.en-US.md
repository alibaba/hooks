---
title: useReactive
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
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

### notice

<code  src="./demo/demo4.tsx" />

## API

```js
const state = useReactive(initialValue: Record<string, any>);
```

## Params

| Params       | Description   | Type                  | Default |
|--------------|---------------|-----------------------|---------|
| initialState | Current state | `Record<string, any>` | -       |

