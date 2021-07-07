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

一个执行递减任务的Hook。

## 简单示例

<code src="./demo/simple.tsx" />

## 各API

<code src="./demo/apis.tsx" />

## API

```typescript
const {
  time,
  remaining,
  restartTask,
  continueTask,
  stopTask,
  setDecreasing,
  setInterval,
} = useCountDown({
  baseTime: props.time,
  interval: props.interval,
  decreasing: props.decreasing,
});
```

## Params

| 参数      | 说明           | 类型                                                    | 默认值      | 必填 |
| --------- | -------------- | ------------------------------------------------------- | ----------- | ----|
| baseTime   | 倒计时总数，单位毫秒     | `number`                                                 | `undefined` | 是 |
| interval  | 任务执行间隔时间，单位毫秒     | `number`                                                | `1000`      | 否 |
| decreasing |  任务递减值  |`number`                                           |`1000`| 否 |

### Result

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| time       | 剩余时间对象   | `ICountDownTime`                  |
| remaining       | 剩余时间 | `number` |
| restartTask | 重新开始任务，可重置初始值     | `(newBase?: number) => any`           |
| stopTask       | 暂停任务 | `() => any` |
| continueTask       | 继续任务 | `() => any` |
| setInterval       | 中途设置任务执行间隔 | `(interval: number) => any` |
| setDecreasing       | 中途设置任务递减值 | `(decreasing: number) => any` |

### ICountDownTime

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| day       | 剩余天  | `number`      |
| hour       | 剩余小时   | `number`        |
| minute       | 剩余分钟   | `number`        |
| second       | 剩余秒   | `number`        |

