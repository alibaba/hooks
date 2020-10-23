---
title: useFavicon
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useFavicon

用于设置与切换页面 favicon。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useFavicon(faviconURL: string)
```

### Params

| 参数       | 说明                                               | 类型     | 默认值 |
|------------|----------------------------------------------------|----------|--------|
| faviconURL | favicon地址, 支持`svg`/`png`/`ico`/`gif`后缀的图片 | `string` | -      |
