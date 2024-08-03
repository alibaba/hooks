---
nav:
  path: /hooks
---

# useValueMutation

Make a component behave as if it were switching between uncontrolled and controlled. In general, this component will behave like an uncontrolled component and will be controlled when the value of the parameter mutates.

## Examples

### Default Usage

<code  src="./demo/demo1.tsx"/>

### Customize `isEqual` function

<code  src="./demo/demo2.tsx"/>

## API

```ts
const [value,onChange] = useMutableValue<T, V>(
  value: T,
  onChange: (newVal: T) => V,
  isEqual?: (val1?: T, val2?: T) => boolean
  )
```

### Result

| Property | Description                                     | Type               |
| -------- | ----------------------------------------------- | ------------------ |
| value    | value after mutation treatment                  | `T`                |
| onChange | change function involved in mutation processing | `(newVal: T) => V` |

### Params

| Property | Description                             | Type                              | Default     |
| -------- | --------------------------------------- | --------------------------------- | ----------- |
| value    | value for mutation determination        | `T`                               | -           |
| onChange | change function of value                | `(newVal: T) => V`                | -           |
| isEqual  | Determines whether two values are equal | `(val1?: T, val2?: T) => boolean` | `Object.is` |
