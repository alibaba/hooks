---
nav:
  path: /hooks
---

# useHistoryTravel

A hook to manage state change history. It provides encapsulation methods to travel through the history.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Todo List

<code src="./demo/demo2.tsx" />

### Limit maximum history length

<code src="./demo/demo3.tsx" />

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
} = useHistoryTravel<T>(initialValue?: T, maxLength: number = 0 );
```

### Params

| Property     | Description                                                                                                               | Type     | Default     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| initialValue | Optional initial value                                                                                                    | `T`      | -           |
| maxLength    | Optional limit the maximum length of history records. If the maximum length is exceeded, the first record will be deleted | `number` | 0 unlimited |

### Result

| Property      | Description                                                                       | Type                            |
| ------------- | --------------------------------------------------------------------------------- | ------------------------------- |
| value         | Current value                                                                     | `T`                             |
| setValue      | Set value                                                                         | `(value: T) => void`            |
| backLength    | The length of backward history                                                    | `number`                        |
| forwardLength | The length of forward history                                                     | `number`                        |
| go            | Move between the history, move backward on step < 0，and move forward on step > 0 | `(step: number) => void`        |
| back          | Move one step backward                                                            | `() => void`                    |
| foward        | Move one step forward                                                             | `() => void`                    |
| reset         | Reset history to initial value by default or provide a new initial value.         | `(newInitialValue?: T) => void` |
