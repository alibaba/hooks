---
nav:
  path: /hooks
---

# useEnhance

useEnhance 可以增强 useReducer 从而可以使用一些 redux 中间件

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
function useEnhance<
  S extends ReducerStateWithoutAction<ReducerWithoutAction<any>>,
  D extends DispatchWithoutAction,
  A extends Action = AnyAction,
>(rawState: S, rawDispatch: D, ...middlewareList: Middleware[]): [S, EnhanceDispatch];

function useEnhance<
  S extends ReducerState<Reducer<any, any>>,
  D extends Dispatch<ReducerAction<Reducer<any, any>>>,
>(
  rawState: S,
  rawDispatch: D,
  ...middlewareList: Middleware[]
): [S, EnhanceDispatch<Parameters<D>[0]>];
```

### Params

| 参数        | 说明                                   | 类型                 | 默认值 |
| ----------- | -------------------------------------- | -------------------- | ------ |
| rawState    | useReducer 的返回值的 state            | `S`                  | -      |
| rawDispatch | useReducer 的返回值的 setter           | `(newValue: S) => S` | -      |
| ...rest     | redux 中间件如 redux-thunk、redux-saga | `Middleware`         | `-`    |

### Result

| 参数              | 说明                                  | 类型                                     |
| ----------------- | ------------------------------------- | ---------------------------------------- |
| [state, dispatch] | 当前的 state value 和 setter function | `[S, EnhanceDispatch<Parameters<D>[0]>]` |

### 注意

1. 不支持 redux 所有中间件，比如 redux-logger 不支持，因为无法获取 nextState
2. 在 effect 销毁函数中调用 dispatch，getState 函数取得的值是下次渲染的值（由于 react effect destroy 函数的执行时机实在下一次渲染，这里期待一下 useEvent）
