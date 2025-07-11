---
nav:
  path: /hooks
---

# useValueMutation

使一个组件的表现如同在非受控与受控间切换。一般情况下该组件的表现会如同非受控组件,参数value突变时组件会受控。

## 代码演示

### 基础用法

<code  src="./demo/demo1.tsx"/>

### 自定义`isEqual`函数

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

| 参数     | 说明                   | 类型               |
| -------- | ---------------------- | ------------------ |
| value    | 经过突变处理后的value  | `T`                |
| onChange | 参与突变处理的变更函数 | `(newVal: T) => V` |

### Params

| 参数     | 说明                  | 类型                              | 默认值      |
| -------- | --------------------- | --------------------------------- | ----------- |
| value    | 用于突变判断的value   | `T`                               | -           |
| onChange | value的变更函数       | `(newVal: T) => V`                | -           |
| isEqual  | 判断两个value是否相等 | `(val1?: T, val2?: T) => boolean` | `Object.is` |
