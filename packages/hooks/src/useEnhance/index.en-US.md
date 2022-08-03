---
nav:
  path: /hooks
---

# useEnhance

useEnhance can enhance useReducer to use some redux middleware

## Examples

### Default usage

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

| 参数        | 说明                                             | 类型                 | 默认值 |
| ----------- | ------------------------------------------------ | -------------------- | ------ |
| rawState    | state for the return value of useReducer         | `S`                  | -      |
| rawDispatch | setter for the return value of useReducer        | `(newValue: S) => S` | -      |
| ...rest     | redux middleware such as redux-thunk, redux-saga | `Middleware`         | `-`    |

### Result

| 参数              | 说明                                    | 类型                                     |
| ----------------- | --------------------------------------- | ---------------------------------------- |
| [state, dispatch] | Current state value and setter function | `[S, EnhanceDispatch<Parameters<D>[0]>]` |

### Notice

1. Does not support all middleware of redux, such as redux-logger does not support, because the nextState cannot be obtained
2. Call dispatch in the effect destruction function, and the value obtained by the getState function is the value of the next rendering (because the execution time of the react effect destroy function is the next rendering, look forward to the useEvent here)
