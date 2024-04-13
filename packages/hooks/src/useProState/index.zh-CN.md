---
nav:
  path: /hooks
---

# useProState

管理 state 的 Hook，提供设置、获取最新值、重置、合并的能力。

## 代码演示

### 获取最新值

<code src="./demo/demo1.tsx" />

### 合并与重置

<code src="./demo/demo2.tsx" />

## API

```typescript
export type SetMergeState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;
export type DispatchType<S> = Dispatch<SetStateAction<S>>;

function useProState<S extends Record<string, any>>(
  initialState?: S | (() => S),
): [
  S,
  {
    setState: DispatchType<S>;
    getState: () => S;
    resetState: () => void;
    setMergeState: SetMergeState<S>;
  },
];

function useProState<S>(initialState?: S | (() => S)): [
  S,
  {
    setState: DispatchType<S>;
    getState: () => S;
    resetState: () => void;
    setMergeState: (s: Record<string, any>) => void;
  },
];
```

### Result

| 参数          | 说明       | 类型                                                   | 默认值 |
| ------------- | ---------- | ------------------------------------------------------ | ------ |
| state         | 当前状态   | `S`                                                    | -      |
| setState      | 设置状态   | `DispatchType<S>`                                      | -      |
| getState      | 获取最新值 | `() => S`                                              | -      |
| resetState    | 重置状态   | `() => void`                                           | -      |
| setMergeState | 合并状态   | `SetMergeState<S> ｜ (s: Record<string, any>) => void` | -      |

### Params

| 参数         | 说明     | 类型           | 默认值 |
| ------------ | -------- | -------------- | ------ |
| initialState | 初始状态 | `S \| () => S` | -      |
