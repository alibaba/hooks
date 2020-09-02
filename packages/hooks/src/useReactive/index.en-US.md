---
title: useReactive
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /state/use-reactive
---

## useReactive

It offers data reactivity when manipulating states and views, in which case `useState`  is unnecessary for state definition. Modifying properties will automatically lead to view rerendering.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

### array

<code src="./demo/demo2.tsx" />


## API

```js
let state = useReactive(initialValue:object,options?:object);
```

## initialState

| Params         | Description           | Type   | Default |
| ------------ | -------------- | ------ | ------ |
| initialState | current state | object | none     |

