---
title: useExternal
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useExternal

一个用于动态地向页面加载或卸载外部资源的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 加载 CSS

<code src="./demo/demo2.tsx" />

### 加载图片

<code src="./demo/demo3.tsx" />

### 传入变量

<code src="./demo/demo4.tsx" />

## API

```typescript
const [status, { toggle, unload, load }] = useExternal(path: string, options?: Options);
```

### Result

| 参数    | 说明         | 类型                                                 |
|---------|--------------|------------------------------------------------------|
| status  | 加载状态，`unset`(未设置), `loading`(加载中), `ready`(加载完成), `error`(加载失败) | `string` |
| toggle  | 切换外部资源 | `() => void`  |
| load    | 加载外部资源 | `() => void` |
| unload  | 卸载外部资源 | `() => void` |

### Params

| 参数     | 说明                                  | 类型     | 默认值 |
|------------|----------------------------------------------|----------|---------|
| path       | 外部资源 url 地址                             | `string` | -       |

### Options

| 参数     | 说明                                  | 类型     | 默认值 |
|------------|----------------------------------------------|----------|---------|
| type | 需引入外部资源的类型，支持 `js`/`css`/`img`  | `string` | -      |
| async | 引入外链脚本的 `<script>` 的 async 属性 | `boolean` | true       |
| media | 引入外链样式表 `<link>` 的 media 属性, 如 `all`/`screen`/`print`/`handheld` | `string` | all       |
| target | 需插入外部图片资源 `<img>` 的父容器 DOM 节点或者 Refs  | `HTMLElement` \| `(() => HTMLElement)` \| `MutableRefObject` | -      |
