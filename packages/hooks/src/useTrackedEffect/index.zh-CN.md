---
title: useTrackedEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useTrackedEffect

在 `useEffect` 的基础上，追踪触发 effect 的依赖变化。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```javascript
useTrackedEffect(
  effect: (changes:[], previousDeps:[], currentDeps:[]) => (void | (() => void | undefined)),
  deps?: deps,
)
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| effect | 副作用函数  | (changes:array, previousDeps: array, currentDeps: array) => (void | (() => void | undefined)) | -      |
| deps | effect 所依赖的值数组 | array \| undefined | -      |
