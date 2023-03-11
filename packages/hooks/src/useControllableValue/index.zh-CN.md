---
nav:
  path: /hooks
---

# useControllableValue

在某些组件开发时，我们需要组件的状态既可以自己管理，也可以被外部控制，`useControllableValue` 就是帮你管理这种状态的 Hook。

## 代码演示

### 非受控组件

<code src="./demo/demo1.tsx" />

### 受控组件

<code src="./demo/demo2.tsx" />

### 无 value，有 onChange 的组件

<code src="./demo/demo3.tsx" />

## API

```typescript
const [state, setState] = useControllableValue(props: Record<string, any>, options?: Options);
```

### Result

| 参数     | 说明              | 类型                                                |
| -------- | ----------------- | --------------------------------------------------- |
| state    | 状态值            | -                                                   |
| setState | 修改 state 的函数 | `(value: any \| ((prevState: any) => any)) => void` |

### Params

| 参数    | 说明         | 类型                  | 默认值 |
| ------- | ------------ | --------------------- | ------ |
| props   | 组件的 props | `Record<string, any>` | -      |
| options | 可选配置项   | `Options`             | -      |

### Options

| 参数                 | 说明                                                    | 类型     | 默认值         |
| -------------------- | ------------------------------------------------------- | -------- | -------------- |
| defaultValue         | 默认值，会被 `props.defaultValue` 和 `props.value` 覆盖 | -        | -              |
| defaultValuePropName | 默认值的属性名                                          | `string` | `defaultValue` |
| valuePropName        | 值的属性名                                              | `string` | `value`        |
| trigger              | 修改值时，触发的函数                                    | `string` | `onChange`     |
