---
nav:
  path: /hooks
---

# useStateRef
处理闭包问题，在useState的基础上多了一个获取最新state的函数

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [value, setValue, getValue] = useStateRef(false);
```
