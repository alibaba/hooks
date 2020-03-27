---
title: useDocumentVisibility
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /zh-CN/dom/use-document-visibility
---

# useDocumentVisibility

https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilityState

可以获取页面可见状态的 Hook

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />


## API

```
const documentVisibility = useDocumentVisibility();
```

### Result
| 参数    | 说明                                         | 类型                   | 值 |
|---------|----------------------------------------------|------------------------|--------|
| documentVisibility | 判断document是否在是否处于可见状态 | string | 'visible' \| 'hidden' \| 'prerender'  \| true    |
