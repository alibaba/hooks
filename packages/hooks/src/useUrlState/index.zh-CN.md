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

一个同步组件内部状态和 query 参数的 hook.

## 代码演示

### 默认用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState] = useUrlState(initialState, config);
```

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| initialState | 初始状态，同 useState                       | S \| () => S                    | -      |
| options | url 配置                       | UrlConfig                    | -      |

### Options

| 参数    | 说明                                         | 类型                   | 默认值 |
|------|--------------|--------|--------|
| historyType | 历史记录类型  | 'browser' \| 'hash' |  'browser'    |
| navigateMode | 状态变更时对 history 的影响方式 | 'push' \| 'replace' | 'replace'    |

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| state  | 同 useState                             | S    |
| setState     | 同 useState                             |  (state: S) => void \| (() => ((state: S) => S))      |
