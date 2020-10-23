---
title: useHistoryTravel
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useHistoryTravel

A hook to manage state change history. It provides encapsulation methods to travel through the history.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Todo List

<code src="./demo/demo2.tsx" />

## API

```typescript
const { value, setValue, backLength, forwardLength, go, back, forward, reset } = useHistoryTravel<T>(initialValue?: T);
```

### Params

| Property      | Description            | Type | Default |
|---------------|------------------------|------|---------|
| initialValue? | optional initial value | `T`  | -       |

### Result

| Property      | Description                                                                       | Type                          |
|---------------|-----------------------------------------------------------------------------------|-------------------------------|
| value         | current value                                                                     | `T`                           |
| setValue      | function to set value                                                             | `T => void`                   |
| backLength    | the length of backward history                                                    | `number`                      |
| forwardLength | the length of forward history                                                     | `number`                      |
| go            | move between the history, move backward on step < 0，and move forward on step > 0 | `(step: number) => void`      |
| back          | move one step backward in history                                                 | `() => void`                  |
| foward        | move one step forward in history                                                  | `() => void`                  |
| reset         | reset history to initial value by default or provide a new initial value.         | (newInitialValue?: T) => void |
