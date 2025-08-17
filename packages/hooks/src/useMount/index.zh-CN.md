---
nav:
  path: /hooks
---

# useMount

只在组件初始化时执行的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useMount(fn: EffectCallback);
```

### 参数

| 参数 | 说明               | 类型         | 默认值 |
| ---- | ------------------ | ------------ | ------ |
| fn   | 初始化时执行的函数 | `EffectCallback` | -      |
