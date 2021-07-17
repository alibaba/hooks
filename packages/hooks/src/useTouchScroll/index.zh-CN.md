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

一个获取touch事件偏移值的hook。

## 简单展示

<code src="./demo/simple.tsx" />

## x轴的偏移

<code src="./demo/x.tsx" />

## y轴的偏移

<code src="./demo/y.tsx" />

## API

```typescript
const { isMoving, positions } = useTouchScroll({
  ref: { current: HTMLElement },
  deviationXBase: number,
  deviationYBase: number,
});

export declare interface IUseTouchScrollReturn {
  // 是否在移动中
  isMoving: boolean;
  // 位移返回值
  positions: {
    // 位移之后的结果值
    base: IDeviation;
    // 位移开始位置
    start: IPosition;
    // 当次touch偏移值
    deviation: IDeviation;
    // 格式化之后的偏移值
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
| ref   | 要监听touch事件的元素     | `{current:HTMLElement}`                                                 | `undefined` | 是 |
| deviationXBase  | x轴位移基准，单位px | `number`                                                | `0`      | 否 |
| deviationYBase |  y轴位移基准，单位px  |`number`                                           |`0`| 否 |

### Result

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| isMoving       | 是否在移动中   | `boolean`                  |
| positions       | 位置与偏移值 | `IPositions` |

### IPositions

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| base       | 位移之后的结果值  | `IDeviation`      |
| start       | 位移开始点   | `IPosition`        |
| deviation       | 当次touch偏移值   | `IDeviation`        |
| formattedDeviation       | 格式化之后的偏移值   | `IDeviation`        |

### IPosition

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| x       | x轴坐标  | `number`      |
| y       | y轴坐标   | `number`        |

### IDeviation

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| x       | x轴偏移值  | `number`      |
| y       | y轴偏移值   | `number`        |
