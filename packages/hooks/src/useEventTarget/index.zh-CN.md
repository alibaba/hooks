---
title: useEventTarget
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useEventTarget

常见表单控件(通过 e.target.value获取表单值) 的 onChange 跟 value 逻辑封装，支持 自定义值转换 跟 重置 功能。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 自定义值切换

<code src="./demo/demo2.tsx" />

## API

```javascript
const [ { value, onChange }, reset ] = useEventTarget<T, U>(initialValue?: T, transformer?: (value: U) => T );
```

### Result

| 参数              | 说明               | 类型                  |
|------------------|--------------------|-----------------------|
| value            | 表单控件的值         | T |
| onChange         | 表单控件值发生变化时候的回调 |  (e: { target: { value: T }}) => void |
| reset            | 重置函数         | () => void

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| initialValue? | 可选项, 初始值  | T |  - |     
| transformer? | 可选项，可自定义回调值的转化  | (value: U) => T | - |
