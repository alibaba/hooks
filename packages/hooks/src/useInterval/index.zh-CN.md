---
title: useInterval
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /zh-CN/state/use-interval
---

# useInterval

一个可以处理 setInterval 计时器函数的 Hook。

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```javascript
useInterval(fn: () => void, interval: number, options?: options);
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
|------|---------------------------|--------|--------|
| fn   | 需要循环执行的函数 | () => void | - |
| options  | Config the setInterval behavior. See the Options section below | object  | - |


### Options

| 参数  | 说明 | 类型 | 默认值 |
|-------|--------------------------|--------|--------|
| immediate | Whether it is executed immediately for the first time | boolean | false |
