---
title: useTouchScroll
nav:
  title: Hooks
  path: /hooks
group:
  title: UI
  path: /ui
---

# useTouchScroll

A hook to get the offset value of touch event.

## Simple

<code src="./demo/simple.tsx" />

## Offset of x-axis

<code src="./demo/x.tsx" />

## Offset of y-axis

<code src="./demo/y.tsx" />

## API

```typescript
const { isMoving, positions } = useTouchScroll({
  ref: { current: HTMLElement },
  deviationXBase: number,
  deviationYBase: number,
});

export declare interface IUseTouchScrollReturn {
  // is moving
  isMoving: boolean;
  // deviation return value
  positions: {
    // move result
    base: IDeviation;
    // position before moving
    start: IPosition;
    // touch moving deviation
    deviation: IDeviation;
    // Offset value after formatting
    formattedDeviation: IPosition;
  };
}

export declare interface IPosition {
  x: number;
  y: number;
}

export declare interface IDeviation {
  x: number;
  y: number;
}
```

## Params

| 参数      | 说明           | 类型                                                    | 默认值      | 必填 |
| --------- | -------------- | ------------------------------------------------------- | ----------- | ----|
| ref   | The element to listen for the touch event     | `{current:HTMLElement}`                                                 | `undefined` | 是 |
| deviationXBase  | X-axis displacement datum, unit PX | `number`                                                | `0`      | 否 |
| deviationYBase |  Y-axis displacement datum, unit PX  |`number`                                           |`0`| 否 |

### Result

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| isMoving       | is moving   | `boolean`                  |
| positions       | position and deviation | `IPositions` |

### IPositions

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| base       | deviation after moving  | `IDeviation`      |
| start       | move start position   | `IPosition`        |
| deviation       | current touch offset value   | `IDeviation`        |
| formattedDeviation       | current touch offset formatted value   | `IDeviation`        |

### IPosition

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| x       | x-coordinate  | `number`      |
| y       | y-axis coordinates   | `number`        |

### IDeviation

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| x       | x-axis deviation  | `number`      |
| y       | y-axis deviation   | `number`        |
