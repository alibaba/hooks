---
nav:
  path: /hooks
---

# useLazy

可延迟加载并记忆值的 Hook。或可解决 React 18 严格模式下 useEffect 执行两次的问题。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const lazyCallback: () => T = useLazy<T>(
  callback: () => T,
  deps: DependencyList
);
```
