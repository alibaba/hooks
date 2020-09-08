---
title: useTimer
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useTimer

A hook that can manage the timer.

## Examples

<code src="./demo/demo1.tsx" />

## API

```javascript
const [current, {
  start,
  pause,
  cont,
  reset
}] = useTimer({ updateRate });
```

### Result

| Property  | Description          | Type                      |
|-----------|----------------------|---------------------------|
| current   | current time (ms)    | `number`                  |
| start     | start timer          | `(time:number) => void`   |
| pause     | pause timer          | `() => void`              |
| cont      | continue timer       | `() => void`              |
| reset     | stop and reset to 0  | `() => void`              |

### Params

| Property     | Description            | Type     | Default |
|--------------|------------------------|----------|---------|
| updateRate   | state update rate (ms) | `number` | 1000    |