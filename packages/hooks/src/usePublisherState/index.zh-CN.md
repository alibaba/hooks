---
nav:
  path: /hooks
---

# usePublisherState

基于发布订阅的 state 方法的 Hooks，与`useSubscriberState`结合使用。更新 state 时只会触发主动通过`useSubscriberState`接收的组件重渲染。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

### usePublisherState

```typescript
type PublisherStateType<T> = {
  current: T;
  observable: Observable<string>;
};
type SetPublisherStateType<T> = (newVal: T | ((newVal: T) => T), needUpdate?: boolean) => void;

const [state, setState] = usePublisherState<T>(
  initialState: T,
): [PublisherStateType, SetPublisherStateType]
```

基于发布订阅的 state 方法的 Hooks。用于定义和管理状态。返回一个元组，包含当前状态对象和更新状态的方法。

- `initialState: T`: 初始状态的值。

### useSubscriberState

```typescript
const state = useSubscriberState<T>(
  state: PublisherStateType<T>,
): T
```

基于发布订阅的 state 方法的 Hooks。用于订阅状态的更新。返回当前状态的值。

- `state: PublisherStateType<T>`: `usePublisherState`返回的状态对象。
