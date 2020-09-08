---
title: useCountDown
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /en-US/state/use-count-down
---

# useCountDown

A hook for countdown management.

## Countdown to specific time in the future

<code src="./demo/demo1.tsx" />

## Controll timer status manually

<code src="./demo/demo2.tsx" />

## API

```typescript
const [countdown, setTargetDate, formattedRes] = useCountDown(
  {
    targetDate,
    interval,
  }
);
```

## Type defination

| Property      | Description              | Type                                            |
| ------------- | ------------------------ | ----------------------------------------------- |
| TDate         | supported time pattern   | Date \| number \| string \| undefined   |
| FormattedRes | formatted result object | { days, hours, minutes, seconds, milliseconds } |


## Params

| Property  | Description          | Type                                                    | Default     |
| --------- | -------------------- | ------------------------------------------------------- | ----------- |
| targetDate   | Future time        | `TDate`                                                 | `undefined` |
| interval  | Change time interval (ms)        | `number`                                                | `1000`      |

### Return

| Params          | Description                            | Type                      |
| --------------- | -------------------------------------- | ------------------------- |
| countdown       | Timestamp to targetDate (milliseconds)                      | `number`                  |
| setTarget       | Set targetDate | `(target?:TDate) => void` |
| formattedResult | Format return time | `IOriginResult`           |

