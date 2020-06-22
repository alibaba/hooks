---
title: useUrlState
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /zh-CN/state/use-url-state
---

# useUrlState

提供虚拟化列表能力的 Hook，用于解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题。

## 代码演示

### 默认用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [ state, setState ] = useUrlState(key, initialState);
```

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| key | query 参数的 key | string | -      |
| initialState | 初始状态，同 useState                       | S \| () => S                    | -      |


### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| state  | 同 useState                             | S    |
| setState     | 同 useState                             |  (state: S) => void \| (() => ((state: S) => S))      |
