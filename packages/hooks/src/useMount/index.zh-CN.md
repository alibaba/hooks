---
title: useMount
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useMount

<Tag lang="zh-CN" tags="ssr&crossPlatform"></Tag>

只在组件 mount 时执行的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useMount(fn: () => void );
```

### 参数

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fn   | mount 时执行的函数 | `() => void` | -      |
