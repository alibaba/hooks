---
nav:
  path: /hooks
---

# useDocumentVisibility

监听页面是否可见，参考 [visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const documentVisibility = useDocumentVisibility();
```

### Result

| 参数               | 说明                           | 类型                                               |
| ------------------ | ------------------------------ | -------------------------------------------------- |
| documentVisibility | 判断 document 是否处于可见状态 | `visible`\| `hidden` \| `prerender` \| `undefined` |
