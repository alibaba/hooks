## useReactive

It offers data reactivity when manipulating states and views, in which case `useState` is unnecessary for state definition. Modifying properties will automatically lead to view rerendering.

## Examples

### Default Usage

<code src="./demo/demo1.tsx"></code>

### Array

<code src="./demo/demo2.tsx"></code>

### Computed Properties

<code src="./demo/demo3.tsx"></code>

### notice

<code src="./demo/demo4.tsx"></code>

## API

```js
const state = useReactive(initialValue: Record<string, any>);
```

## Params

| Params       | Description   | Type                  | Default |
| ------------ | ------------- | --------------------- | ------- |
| initialState | Current state | `Record<string, any>` | -       |
