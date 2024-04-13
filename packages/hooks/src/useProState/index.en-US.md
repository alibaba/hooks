---
nav:
  path: /hooks
---

# useSetState

The hook that manage state, providing the ability to set, get the latest value, reset, and merge.

## Examples

### Get the latest value

<code src="./demo/demo1.tsx" />

### Merge and reset

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

| Property      | Description          | Type                                                   | Default |
| ------------- | -------------------- | ------------------------------------------------------ | ------- |
| state         | Current state        | `S`                                                    | -       |
| setState      | Set state            | `DispatchType<S>`                                      | -       |
| getState      | Get the latest value | `() => S`                                              | -       |
| resetState    | reset state          | `() => void`                                           | -       |
| setMergeState | merge state          | `SetMergeState<S> ｜ (s: Record<string, any>) => void` | -       |

### Params

| Property     | Description   | Type           | Default |
| ------------ | ------------- | -------------- | ------- |
| initialState | Initial state | `T \| () => T` | -       |
