---
title: useCursor
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useCursor

用于设置输入框光标位置

## 代码演示


<code src="./demo/demo1.tsx" />
<code src="./demo/demo2.tsx" />

## API

```typescript
const [recordCursor, restoreCursor] = useCursor(inputRef.current: HTML, focus: boolean)
```

### Params

| 参数       | 说明                                               | 类型     | 默认值 |
|------------|----------------------------------------------------|----------|--------|
| inputRef | input 元素 | HTML | -      |
| focus | input 是否聚焦 | boolean | -      |
