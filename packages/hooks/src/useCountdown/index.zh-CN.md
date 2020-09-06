---
title: useCountdown
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useCountdown

一个用于管理倒计时的 hook

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```javascript
const [remaining, {
  start,
  pause,
  cont,
  reset
}] = useCounter({ updateRate });
```

### Result

| 参数       | 说明              | 类型                      |
|-----------|-------------------|---------------------------|
| remaining | 当前剩余时间（毫秒）  | `number`                  |
| start     | 开始倒计时          | `(time:number) => void`   |
| pause     | 暂停倒计时          | `() => void`              |
| cont      | 继续倒计时          | `() => void`              |
| reset     | 停止并重置为0       | `() => void`              |

### Params

| 参数         | 说明                  | 类型     | 默认值 |
|--------------|-----------------------|----------|--------|
| updateRate   | 更新频率，单位为毫秒     | `number` | 1000   |