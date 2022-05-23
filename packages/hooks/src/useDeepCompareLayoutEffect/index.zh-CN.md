---
nav:
  path: /hooks
---

# useDeepCompareLayoutEffect

用法与 useLayoutEffect 一致，但 deps 通过 [lodash isEqual](https://lodash.com/docs/4.17.15#isEqual) 进行深比较。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useDeepCompareLayoutEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```
