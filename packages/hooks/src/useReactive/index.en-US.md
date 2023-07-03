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

### It provides the same function as usesafestate. After the component is unloaded, the state change in the asynchronous callback is no longer executed, so as to avoid memory leakage caused by updating the state after the component is unloaded.

<code src="./demo/demo5.tsx"/>

### Notice

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

| Params       | Description                                                                    | Type                      | Default |
| ------------ | ------------------------------------------------------------------------------ | ------------------------- | ------- |
| initialState | Current state                                                                  | `Record<string, any>`     | -       |
| options      | Configure state behavior within asynchronous callbacks after component unmount | `Record<string, boolean>` | -       |

### Options

| Params | Description                                                                                                    | Type      | Default |
| ------ | -------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| safe   | Set whether the status update in the asynchronous callback needs to be executed after the component is unmount | `boolean` | `false` |
