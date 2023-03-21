---
nav:
  path: /hooks
---

# useFavicon

设置页面的 favicon。

因为 Safari 无法动态设置 favicon，所以 `useFavicon` 不能在 Safari 工作。

> Apple intentionally do not want the ability to script favicons. See https://bugs.webkit.org/show_bug.cgi?id=95979#c2 for common.

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useFavicon(href: string);
```

### Params

| 参数 | 说明                                                  | 类型     | 默认值 |
| ---- | ----------------------------------------------------- | -------- | ------ |
| href | favicon 地址, 支持 `svg`/`png`/`ico`/`gif` 后缀的图片 | `string` | -      |
