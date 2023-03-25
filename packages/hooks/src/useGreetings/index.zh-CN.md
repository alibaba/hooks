---
nav:
  path: /hooks
---

# useGreetings

一个根据当前时间返回问候消息的挂钩。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const greetings = useGreetings();
```

### Result

| Property   | Description | Type                              |
| ---------- | ----------- | --------------------------------- |
| `variable` | 白天状态    | `morning/afternoon/evening/night` |
