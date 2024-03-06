---
title: useControllableValue
nav: Hooks
group:
  title: Advanced
  order: 7
order: 1
toc: content
demo:
  cols: 2
---

In some components, we need the state to be managed by itself or controlled by it's parent. `useControllableValue` is a Hook that helps you manage this kind of state.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>

## API

```typescript
const [state, setState] = useControllableValue(props: Record<string, any>, options?: Options);
```

### Result

| Property | Description | Type                                                |
| -------- | ----------- | --------------------------------------------------- |
| state    | State       | -                                                   |
| setState | Set state   | `(value: any \| ((prevState: any) => any)) => void` |

### Params

| Property | Description            | Type                  | Default |
| -------- | ---------------------- | --------------------- | ------- |
| props    | Component props        | `Record<string, any>` | -       |
| options  | Optional configuration | `Options`             | -       |

### Options

| Property             | Description                                                                     | Type     | Default        |
| -------------------- | ------------------------------------------------------------------------------- | -------- | -------------- |
| defaultValue         | The default value, will be overridden by `props.defaultValue` and `props.value` | -        | -              |
| defaultValuePropName | Custom defaultValue attribute name                                              | `string` | `defaultValue` |
| valuePropName        | Custom value attribute name                                                     | `string` | `value`        |
| trigger              | Custom trigger attribute name                                                   | `string` | `onChange`     |
