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

## Customize result formatter

<code src="./demo/demo3.tsx" />

## API

```javascript
const [countdown, setTarget, formattedResult] = useCountDown(
  dateEnd,
  {
    interval,
    formatter
  }
);
```

## Type defination

| Property      | Description              | Type                                            |
| ------------- | ------------------------ | ----------------------------------------------- |
| TDate         | supported time pattern   | Date \| number \| string \| undefined \| null   |
| TOriginResult | original result returned | { days, hours, minutes, seconds, milliseconds } |


## Params

| Property  | Description          | Type                                                    | Default     |
| --------- | -------------------- | ------------------------------------------------------- | ----------- |
| dateEnd   | specific time        | `TDate`                                                 | `undefined` |
| interval  | time interval        | `number`                                                | `1000`      |
| formatter | formatter for result | `(timeStamp:number, originResult:TOriginResult} => any` | `undefined` |


### Return

| Params          | Description                            | Type                      |
| --------------- | -------------------------------------- | ------------------------- |
| countdown       | current time left                      | `number`                  |
| setTarget       | invoke timer manually with target date | `(target?:TDate) => void` |
| formattedResult | result returned                        | `IOriginResult`           |

