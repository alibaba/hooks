---
nav:
  path: /hooks
---

# useExternal

动态注入 JS 或 CSS 资源，useExternal 可以保证资源全局唯一。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 加载 CSS

<code src="./demo/demo2.tsx" />

## API

```typescript
const status = useExternal(path: string, options?: Options);
```

### Result

| 参数   | 说明                                                                               | 类型     |
| ------ | ---------------------------------------------------------------------------------- | -------- |
| status | 加载状态，`unset`(未设置), `loading`(加载中), `ready`(加载完成), `error`(加载失败) | `string` |

### Params

| 参数 | 说明              | 类型     | 默认值 |
| ---- | ----------------- | -------- | ------ |
| path | 外部资源 url 地址 | `string` | -      |

### Options

| 参数           | 说明                                                              | 类型                | 默认值  |
| -------------- | ----------------------------------------------------------------- | ------------------- | ------- |
| type           | 需引入外部资源的类型，支持 `js`/`css`，如果不传，则根据 path 推导 | `string`            | -       |
| js             | `script` 标签支持的属性                                           | `HTMLScriptElement` | -       |
| css            | `link` 标签支持的属性                                             | `HTMLStyleElement`  | -       |
| keepWhenUnused | 在不持有资源的引用后，仍然保留资源                                | `boolean`           | `false` |
