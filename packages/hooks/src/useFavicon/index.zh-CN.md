---
nav:
  path: /hooks
---

# useFavicon

设置页面的 favicon。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useFavicon(href: string)
```

### Params

| 参数 | 说明                                                 | 类型     | 默认值 |
|------|------------------------------------------------------|----------|--------|
| href | favicon地址, 支持 `svg`/`png`/`ico`/`gif` 后缀的图片 | `string` | -      |
