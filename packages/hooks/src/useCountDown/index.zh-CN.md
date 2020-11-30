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

一个用于管理倒计时的Hook。

## 到未来某一时间点的计时

<code src="./demo/demo1.tsx" />

## 手动控制状态

<code src="./demo/demo2.tsx" />

**说明**

useCountDown 的精度为毫秒，可能会造成以下几个问题

* 即使设置 interval 时间为 1000ms，useCountDown 每次更新间隔也**不一定**正好是 1000 ms，而是 1000 毫秒左右。
* 在第二个 demo 中，countdown 开始一般是 499x 毫秒，因为程序执行有延迟。

如果你的精度只要到秒就好了，可以这样用 `Math.round(countdown / 1000)`。

## API

```typescript
const [countdown, setTargetDate, formattedRes] = useCountDown(
  {
    targetDate,
    interval,
    onEnd
  }
);
```

## Type

| 参数          | 说明                                | 类型                                            |
| ------------- | ----------------------------------- | ----------------------------------------------- |
| TDate         | 支持的时间格式                      | `Date` \| `number` \| `string` \| `undefined`   |
| FormattedRes | 返回的原始结果, 均为大于等于0的数字 | `{ days, hours, minutes, seconds, milliseconds }` |


## Params

| 参数      | 说明           | 类型                                                    | 默认值      |
| --------- | -------------- | ------------------------------------------------------- | ----------- |
| targetDate   | 未来时间     | `TDate`                                                 | `undefined` |
| interval  | 变化时间间隔（毫秒）     | `number`                                                | `1000`      |
| onEnd |  未来时间结束后的回调函数  |`Function`                                           |`undefined`|


### Result

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| countdown       | 距离 targetDate 的时间戳（毫秒）   | `number`                  |
| setTarget       | 设置 targetDate | `(target?:TDate) => void` |
| formattedRes | 格式化返回时间     | `FormattedRes`           |

