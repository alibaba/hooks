---
title: useDocumentVisibility
nav: Hooks
group:
  title: Dom
  order: 6
order: 3
toc: content
demo:
  cols: 2
---

监听页面是否可见，参考 [visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const documentVisibility = useDocumentVisibility();
```

### Result

| 参数               | 说明                           | 类型                                               |
| ------------------ | ------------------------------ | -------------------------------------------------- |
| documentVisibility | 判断 document 是否处于可见状态 | `visible`\| `hidden` \| `prerender` \| `undefined` |
