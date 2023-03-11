---
nav:
  path: /hooks
---

# useCountDown

一个用于管理倒计时的 Hook。

## 到未来某一时间点的倒计时

<code src="./demo/demo1.tsx" />

## 配置项动态变化

<code src="./demo/demo2.tsx" />

## 通过 leftTime 配置剩余时间

<code src="./demo/demo3.tsx" />

**说明**

useCountDown 的精度为毫秒，可能会造成以下几个问题

- 即使设置 interval 时间为 1000 毫秒，useCountDown 每次更新间隔也**不一定**正好是 1000 毫秒，而是 1000 毫秒左右。
- 在第二个 demo 中，countdown 开始一般是 499x 毫秒，因为程序执行有延迟。

如果你的精度只要到秒就好了，可以这样用 `Math.round(countdown / 1000)`。

如果同时传了 `leftTime` 和 `targetDate`，则会忽略 `targetDate`，以 `leftTime` 为主

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
    onEnd
  }
);
```

### Params

| 参数       | 说明                 | 类型         | 默认值 |
| ---------- | -------------------- | ------------ | ------ |
| leftTime   | 剩余时间（毫秒）     | `number`     | -      |
| targetDate | 目标时间             | `TDate`      | -      |
| interval   | 变化时间间隔（毫秒） | `number`     | `1000` |
| onEnd      | 倒计时结束触发       | `() => void` | -      |

### Result

| 参数         | 说明                 | 类型           |
| ------------ | -------------------- | -------------- |
| countdown    | 倒计时时间戳（毫秒） | `number`       |
| formattedRes | 格式化后的倒计时     | `FormattedRes` |

## 备注

`leftTime`、`targetDate`、`interval`、`onEnd` 支持动态变化
