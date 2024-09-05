---
nav:
  path: /hooks
---

# useLogger

一个在控制台中输出组件生命周期内日志的Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useLogger(componentName: string, ...rest);
```

### Params

| 参数          | 说         | 类型     | 默认值 |
| ------------- | ---------- | -------- | ------ |
| componentName | 组件名称   | `string` | -      |
| ...rest       | 输出的日志 | `string` | -      |
