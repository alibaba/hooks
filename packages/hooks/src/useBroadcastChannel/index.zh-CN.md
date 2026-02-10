---
nav:
  path: /hooks
---

# useBroadcastChannel

用于在浏览器标签页或窗口之间通信的 Hook，基于 [BroadcastChannel API](https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API)。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, {
  postMessage,
  close,
}] = useBroadcastChannel<T>(channelName, options?);
```

### Result

| 参数        | 说明                 | 类型               |
| ----------- | -------------------- | ------------------ |
| state       | 最近一次收到的消息   | `T`                |
| postMessage | 发送消息到频道       | `(msg: T) => void` |
| close       | 关闭频道并清理监听器 | `() => void`       |

### Params

| 参数        | 说明                          | 类型     | 默认值 |
| ----------- | ----------------------------- | -------- | ------ |
| channelName | 频道名称                      | `string` | -      |
| options     | 可选配置（如 onMessage 回调） | `object` | -      |
