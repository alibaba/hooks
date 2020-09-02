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

### debounce and throttle

<code src="./demo/demo3.tsx" />


## API

```js
let state = useReactive(initialValue:object,options?:object);
```

## initialState

| 参数         | 说明           | 类型   | 默认值 |
| ------------ | -------------- | ------ | ------ |
| initialState | current state | object | none     |

## options

| 参数     | 说明         | 类型   | 默认值 |
| -------- | ------------ | ------ | ------ |
| debounce | The number of milliseconds to delay. | number | 0      |
| throttle | The number of milliseconds to delay.	 | number | 0      |
