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

可以获取页面可见状态的 Hook。

[visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

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
| documentVisibility | 判断 document 是否在是否处于可见状态 | string | 'visible' \| 'hidden' \| 'prerender'  \| undefined    |

> 如果没有 document 环境则返回 `undefined`; 另外 visibilitychange API 目前处于 Recommendation 阶段，经测试在 Safari 只会触发一次改变，与 Chrome、Firefox 表现不同。
