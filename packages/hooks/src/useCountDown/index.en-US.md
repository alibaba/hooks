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

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook for countdown management.

## Countdown to specific time in the future

<code src="./demo/demo1.tsx" />

## Controll timer status manually

<code src="./demo/demo2.tsx" />

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

const [countdown, setTargetDate, formattedRes] = useCountDown(
  {
    targetDate,
    interval,
    onEnd
  }
);
```

**Remak**

The precision of useCountDown is milliseconds, which may cause the following problems

* Even if the interval time is set to 1000ms, the update interval of useCountDown may not be exactly 1000ms, but about 1000ms.
* In the second demo, countdown is generally 499x milliseconds at the beginning, because the program execution is delayed.

If you only need to be accurate to the second, you can use it like this `Math.round(countdown / 1000)`.

### Params

| Property   | Description                                            | Type       | Default |
|------------|--------------------------------------------------------|------------|---------|
| targetDate | Target time                                            | `TDate`    | -       |
| interval   | Change time interval (ms)                              | `number`   | `1000`  |
| onEnd      | The callback function after the end of the future time | `()=>void` | -       |

### Return

| Params          | Description                            | Type                      |
|-----------------|----------------------------------------|---------------------------|
| countdown       | Timestamp to targetDate (milliseconds) | `number`                  |
| setTarget       | Set targetDate                         | `(target?:TDate) => void` |
| formattedResult | Format return time                     | `IOriginResult`           |

