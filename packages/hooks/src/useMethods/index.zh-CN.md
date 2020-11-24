---
title: useMap
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useMap

一个可以提供管理 State 状态方法的 Hook。

## 代码演示

<code src="./demo/demo.tsx" />

## API

```typescript
type Action = {
  type: string;
  payload?: any;
};

type CreateMethods<M, S> = (
  state: S
) => {
  [P in keyof M]: (payload?: any) => S;
};

type WrappedMethods<M> = {
  [P in keyof M]: (...payload: any) => void;
};

const [
  state,
  wrappedMethods
] = useMethods(initialState: S, createMethods: CreateMethods<M, S>);
```

### Result

|   参数         | 说 明                     | 类型                                     |
|----------------|--------------------------|------------------------------------------|
| state          | 计算得到后的状态          | 泛型   `S`                                |
| WrappedMethods | 用于改变状态的方法集合     | user defined `WrappedMethods`            |

### Params

| 参数         | 说明                                | 类型                  | 默认值 |
|--------------|------------------------------------|-----------------------|--------|
| initialState  | 初始状态值                         |  any                   | -       |
| createMethods | 集合， 包含用于改变状态的方法        |  `CreateMethods`       | -       |
