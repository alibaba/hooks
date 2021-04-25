---
title: useDidUpdateEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useDidUpdateEffect

一个模拟 componentDidUpdate 的 useEffect hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useDidUpdateEffect(
  effect: (prevDeps: deps) => ReturnType<React.EffectCallback>,
  deps?: deps,
)
```

### Params

| 参数   | 说明                       | 类型                                                   | 默认值 |
| ------ | -------------------------- | ------------------------------------------------------ | ------ |
| effect | 可执行函数                 | `(prevDeps: deps) => ReturnType<React.EffectCallback>` | -      |
| deps   | 可选项，传入依赖变化的对象 | `DependencyList` \| `undefined`                        | -      |
