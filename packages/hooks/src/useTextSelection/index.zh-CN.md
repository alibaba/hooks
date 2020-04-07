---
title: useTextSelection
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /zh-CN/dom/use-text-selection
---

# useTextSelection

实时获取用户当前选取的文本内容及位置。

## 代码演示

### 默认用法

<code src="./demo/demo1.tsx" />

### 使用 Ref

<code src="./demo/demo4.tsx" />

### 使用 Dom

<code src="./demo/demo2.tsx" />

### 划词翻译

<code src="./demo/demo3.tsx" />


## API

``` typescript
const [state, ref?] = useTextSelection(dom);
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| dom? | 可选项，如果未传入则会监听返回结果中的 ref，否则会监听传入的节点 | HTMLElement | (() => HTMLElement) | undefined | - |

### 结果


| 参数 | 说明 | 类型 |
|-----|-----|-----|
| state | dom 节点内选取文本的内容和位置 | 详见下方 state |
| ref | 当未传入任何参数时，将 ref 绑定给需监听的节点 | - |

#### state

| 参数 | 说明 | 类型 |
|-----|-----|-----|
| text | 用户选取的文本值 | string |
| left | 文本的左坐标 | number |
| right | 文本的右坐标 | number |
| top | 文本的顶坐标 | number |
| bottom | 文本的底坐标 | number |
| height | 文本的高度 | number |
| width | 文本的宽度 | number |
