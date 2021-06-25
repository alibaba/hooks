---
title: useLatest
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

# useLatest

<Tag lang="zh-CN" tags="ssr&crossPlatform"></Tag>

返回当前最新值的 Hook，可以避免闭包问题。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const latestValueRef = useLatest<T>(value: T): MutableRefObject<T>;
```