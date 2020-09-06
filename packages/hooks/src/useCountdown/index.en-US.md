---
title: useCountdown
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useCountdown

A hook that can manage the countdown.

## Examples

<code src="./demo/demo1.tsx" />

## API

```javascript
const [remaining, {
  start,
  pause,
  cont,
  reset
}] = useCounter({ updateRate });
```

### Result

| Property  | Description          | Type                      |
|-----------|----------------------|---------------------------|
| remaining | remaining time (ms)  | `number`                  |
| start     | start countdown      | `(time:number) => void`   |
| pause     | pause countdown      | `() => void`              |
| cont      | continue countdown   | `() => void`              |
| reset     | stop and reset to 0  | `() => void`              |

### Params

| Property     | Description            | Type     | Default |
|--------------|------------------------|----------|---------|
| updateRate   | state update rate (ms) | `number` | 1000    |