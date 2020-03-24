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

### 获取选取位置

<code src="./demo/demo2.tsx" />

### 划词翻译

<code src="./demo/demo3.tsx" />


## API

``` typescript
const state: {
  text: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
  height: number;
  width: number;
} = useTextSelection(element: string | HTMLElement | Document)
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| element | 监听 element 元素下的用户选取文本，默认对整个页面做监听 | string, 示例："#target-id", ".target-class" | document |

### 结果

| 参数 | 说明 | 类型 |
|-----|-----|-----|
| text | 用户选取的文本值 | string |
| left | 文本的左坐标 | number |
| right | 文本的右坐标 | number |
| top | 文本的顶坐标 | number |
| bottom | 文本的底坐标 | number |
| height | 文本的高度 | number |
| width | 文本的宽度 | number |
