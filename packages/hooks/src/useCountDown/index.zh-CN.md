---
title: useCountDown
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /zh-CN/state/use-count-down
---

# useCountDown

一个用于 管理倒计时 的Hook..

## 到未来某一时间点的计时

<code src="./demo/demo1.tsx" />

## 手动控制状态

<code src="./demo/demo2.tsx" />

## 格式化返回结果

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

## 类型定义

| 参数          | 说明                                | 类型                                            |
| ------------- | ----------------------------------- | ----------------------------------------------- |
| TDate         | 支持的时间格式                      | Date \| number \| string \| undefined \| null   |
| TOriginResult | 返回的原始结果, 均为大于等于0的数字 | { days, hours, minutes, seconds, milliseconds } |


## 参数

| 参数      | 说明           | 类型                                                    | 默认值      |
| --------- | -------------- | ------------------------------------------------------- | ----------- |
| dateEnd   | 未来时间戳     | `TDate`                                                 | `undefined` |
| interval  | 时间戳间隔     | `number`                                                | `1000`      |
| formatter | 格式化返回结果 | `(timeStamp:number, originResult:TOriginResult} => any` | `undefined` |


### 返回值

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| countdown       | 返回的时间戳   | `number`                  |
| setTarget       | 手动启用计时器 | `(target?:TDate) => void` |
| formattedResult | 返回的结果     | `IOriginResult`           |

