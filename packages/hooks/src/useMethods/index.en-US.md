---
title: useMethods
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useMap

A hook that can define the methods to manage your state .

## Examples

### Default usage

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

| Property       | Description             | Type                                     |
|----------------|-------------------------|------------------------------------------|
| state          | calculated state        | Generic   `S`                            |
| WrappedMethods | add key                 | user defined `WrappedMethods`            |


### Params

| Property      | Description                                    | Type                   | Default |
|---------------|------------------------------------------------|------------------------|---------|
| initialState  | the initial state                              |  any                   | -       |
| createMethods | a container  provides methods                  |  `CreateMethods`       | -       |
