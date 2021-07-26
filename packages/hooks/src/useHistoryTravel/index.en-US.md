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

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook to manage state change history. It provides encapsulation methods to travel through the history.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Todo List

<code src="./demo/demo2.tsx" />

## API

```typescript
const { 
  value, 
  setValue, 
  backLength, 
  forwardLength,
  go, 
  back, 
  forward 
} = useHistoryTravel<T>(initialValue?: T);
```

### Params

| Property     | Description            | Type | Default |
|--------------|------------------------|------|---------|
| initialValue | Optional initial value | `T`  | -       |

### Result

| Property      | Description                                                                       | Type                          |
|---------------|-----------------------------------------------------------------------------------|-------------------------------|
| value         | Current value                                                                     | `T`                           |
| setValue      | Function to set value                                                             | `(value: T) => void`          |
| backLength    | The length of backward history                                                    | `number`                      |
| forwardLength | The length of forward history                                                     | `number`                      |
| go            | Move between the history, move backward on step < 0，and move forward on step > 0 | `(step: number) => void`      |
| back          | Move one step backward in history                                                 | `() => void`                  |
| foward        | Move one step forward in history                                                  | `() => void`                  |
| reset         | Reset history to initial value by default or provide a new initial value.         | (newInitialValue?: T) => void |
