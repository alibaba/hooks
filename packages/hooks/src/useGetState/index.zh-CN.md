---
nav:
  path: /hooks
---

# useGetState

搭配 useRef，在普通 useState 返回值中增加 getter 方法穿透闭包获取最新值

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState, getState] = ueGetState<S>(initialState: S | (() => S)): [S, (nextState: S | ((prevState: S) => S)) => void, () => S]
```