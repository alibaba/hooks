---
title: useThrottle
group:
  title: SideEffect
  path: /side-effect
  order: 700
---

# useThrottle

用来处理值节流 Hook。

## 代码演示

### 基础使用

<code src="./demo/demo1.tsx" />

## API

```javascript
const ThrottledValue = useThrottle(
  value: any,
  wait: number
);
```

### Params

| 参数  | 说明                     | 类型   | 默认值 |
|-------|--------------------------|--------|--------|
| value | 需要节流变化的值         | any    | -      |
| wait  | 防抖等待时间，单位为毫秒 | number | 1000   |