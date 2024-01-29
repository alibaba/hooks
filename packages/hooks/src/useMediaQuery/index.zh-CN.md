---
nav:
  path: /hooks
---

# useMediaQuery

获取响应式信息。

## 代码演示

### 在组件中获取响应式信息

<code src="./demo/demo1.tsx" />

## API

```typescript
interface ResponsiveInfo {
  value: number;
  currentQuery: string;
}

function useMediaQuery(queries: K[], values: T[], defaultValue: T): ResponsiveInfo;
```
