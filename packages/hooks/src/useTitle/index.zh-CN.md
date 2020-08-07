---
title: useTitle
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
  order: 11
legacy: /zh-CN/state/use-title
---

# useTitle

用于设置页面标题的 Hook。

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```javascript
useTitle(value: string, options?: object);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| value | 页面标题  | string  |       |


### Options

| 参数  | 说明                     | 类型   | 默认值 |
|-------|--------------------------|--------|--------|
| restoreOnUnmount | 恢复页面标题 | boolean | false |
