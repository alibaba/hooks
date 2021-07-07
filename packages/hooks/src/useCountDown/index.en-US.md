---
title: useCountDown
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useCountDown

a hook that performs decrement tasks

## Simple example

<code src="./demo/simple.tsx" />

## Each API

<code src="./demo/apis.tsx" />

## API

```typescript
const {
  time,
  remaining,
  restartTask,
  continueTask,
  stopTask,
  setDecreasing,
  setInterval,
} = useCountDown({
  baseTime: props.time,
  interval: props.interval,
  decreasing: props.decreasing,
});
```

## Params

| Property      | Description           | Type                                                    | Default      | required |
| --------- | -------------- | ------------------------------------------------------- | ----------- | ----|
| baseTime   | countdown total     | `number`                                                 | `undefined` | yes |
| interval  | task execution interval     | `number`                                                | `1000`      | no |
| decreasing |  task execution decreasing  |`number`                                           |`1000`| no |

### Result

| Property            | Description           | Type                      |
| --------------- | -------------- | ------------------------- |
| time       | remaining time object   | `ICountDownTime`                  |
| remaining       | time remaining | `number` |
| restartTask | restart the task, can reset the initial value     | `(newBase?: number) => any`           |
| stopTask       | stop task | `() => any` |
| continueTask       | continue task | `() => any` |
| setInterval       | set interval at task running | `(interval: number) => any` |
| setDecreasing       | set decreasing at task running | `(decreasing: number) => any` |

### ICountDownTime

| Property            | Description           | Type                      |
| --------------- | -------------- | ------------------------- |
| day       | days left  | `number`      |
| hour       | hours left   | `number`        |
| minute       | minutes left   | `number`        |
| second       | seconds left   | `number`        |

