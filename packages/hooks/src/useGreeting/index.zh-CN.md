---
nav:
  path: /hooks
---

# useGreeting

一个根据当前时间返回问候消息的 hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const greeting = useGreeting();
```

### Params

| Property  | Description                                                      | Type                        | Default |
| --------- | ---------------------------------------------------------------- | --------------------------- | ------- |
| prefix    | 在当天的状态之前可选地添加一个字符串                             | `string`                    |         |
| suffix    | 在当天的状态之后可选地添加一个字符串                             | `string`                    |         |
| transform | 可选择将 (morning/afternoon/evening/night) 转换为大写/首字母大写 | `uppercase` \| `capitalize` | -       |

### Result

| Property | Description | Type     |
| -------- | ----------- | -------- |
| greeting | 一天的状态  | `string` |
