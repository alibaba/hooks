---
title: useControllableValue
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useControllableValue

In some components, we need the state to be managed by itself or controlled by it's parent. `useControllableValue` is a Hook that helps you manage this kind of state.

## Examples

### Uncontrolled component

<code src="./demo/demo1.tsx" />

### Controlled component

<code src="./demo/demo2.tsx" />

### No value, have onChange component

<code src="./demo/demo3.tsx" />

## API

```javascript
const [state, setState] = useControllableValue(props: object, options?: Options)
```

### Result

| Property | Description                  | Type                   |
|----------|------------------------------|------------------------|
| state    | your state                   | -                      |
| setState | Modify the function of state | `(value: any) => void` |

### Params

| Property | Description                              | Type     | Default |
|----------|------------------------------------------|----------|---------|
| props    | component props                          | `object` | -       |
| options  | Optional configuration item, see Options | -        | -       |


### Options

| Property             | Description                                                                 | Type     | Default        |
|----------------------|-----------------------------------------------------------------------------|----------|----------------|
| defaultValue         | The default value, will be overridden by props.defaultValue and props.value | -        | -              |
| defaultValuePropName | Custom defaultVlue attribute name                                           | `string` | `defaultValue` |
| valuePropName        | Custom value attribute name                                                 | `string` | `value`        |
| trigger              | Custom trigger attribute name                                               | `string` | `onChange`     |
