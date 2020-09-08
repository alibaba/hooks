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

## API

```typescript
const [countdown, setTargetDate, formattedRes] = useCountDown(
  {
    targetDate,
    interval,
  }
);
```

## 类型定义

| 参数          | 说明                                | 类型                                            |
| ------------- | ----------------------------------- | ----------------------------------------------- |
| TDate         | 支持的时间格式                      | Date \| number \| string \| undefined   |
| FormattedRes | 返回的原始结果, 均为大于等于0的数字 | { days, hours, minutes, seconds, milliseconds } |


## 参数

| 参数      | 说明           | 类型                                                    | 默认值      |
| --------- | -------------- | ------------------------------------------------------- | ----------- |
| targetDate   | 未来时间     | `TDate`                                                 | `undefined` |
| interval  | 变化时间间隔（毫秒）     | `number`                                                | `1000`      |


### 返回值

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| countdown       | 距离 targetDate 的时间戳（毫秒）   | `number`                  |
| setTarget       | 设置 targetDate | `(target?:TDate) => void` |
| formattedRes | 格式化返回时间     | `FormattedRes`           |

