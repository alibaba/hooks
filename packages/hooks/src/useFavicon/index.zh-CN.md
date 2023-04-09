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
useFavicon(href: string);
```

### Params

| 参数 | 说明                                                  | 类型     | 默认值 |
| ---- | ----------------------------------------------------- | -------- | ------ |
| href | favicon 地址, 支持 `svg`/`png`/`ico`/`gif` 后缀的图片 | `string` | -      |

## FAQ

### 在 Safari 中不工作？

Safari 无法动态设置 favicon。

> Apple intentionally do not want the ability to script favicons. See https://bugs.webkit.org/show_bug.cgi?id=95979#c2

相关 issue：[#2126](https://github.com/alibaba/hooks/issues/2126)
