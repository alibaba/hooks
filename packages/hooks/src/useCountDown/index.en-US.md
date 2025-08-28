---
nav:
  path: /hooks
---

# useCountDown

A hook for manage countdown.

## Countdown to target time

<code src="./demo/demo1.tsx" />

## Dynamic config

<code src="./demo/demo2.tsx" />

## Config leftTime

<code src="./demo/demo3.tsx" />

## Config currentServerTime

<code src="./demo/demo4.tsx" />

## API

```typescript
type TDate = Date | number | string | undefined;

interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const [countdown, formattedRes] = useCountDown(
  {
    leftTime,
    targetDate,
    interval,
    currentServerTime,
    onEnd
  }
);
```

**Remark**

The precision of useCountDown is milliseconds, which may cause the following problems

- Even if the interval time is set to 1000ms, the update interval of useCountDown may not be exactly 1000ms, but around it.
- In the second demo, countdown is generally 499x milliseconds at the beginning due to the execution delay of the program.

If you only need to be accurate to the second, you can use it like this `Math.round(countdown / 1000)`.

If both `leftTime` and `targetDate` are passed, the `targetDate` is ignored, the `leftTime` is dominant.

If 'currentServerTime' is not configured, the local time is used for the countdown.

### Params

| Property   | Description                                  | Type         | Default |
| ---------- | -------------------------------------------- | ------------ | ------- |
| leftTime   | The rest of time, in milliseconds            | `number`     | -       |
| targetDate | Target time                                  | `TDate`      | -       |
| interval   | Time interval between ticks, in milliseconds | `number`     | `1000`  |
| currentServerTime   | Current server time, in milliseconds | `number`     | -  |
| onEnd      | Function to call when countdown completes    | `() => void` | -       |

### Return

| Params          | Description                              | Type           |
| --------------- | ---------------------------------------- | -------------- |
| countdown       | Timestamp to targetDate, in milliseconds | `number`       |
| formattedResult | Formatted countdown                      | `FormattedRes` |

## Remark

`leftTime`、`targetDate`、`interval`、`currentServerTime`、`onEnd` support dynamic change.
