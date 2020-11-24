---
title: useTitle
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useTitle

用于设置页面标题的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useTitle(value: string, options?: Options);
```

### Params

| 参数  | 说明     | 类型     | 默认值 |
|-------|----------|----------|--------|
| value | 页面标题 | `string` | -      |


### Options

| 参数             | 说明         | 类型      | 默认值  |
|------------------|--------------|-----------|---------|
| restoreOnUnmount | 恢复页面标题 | `boolean` | `false` |
