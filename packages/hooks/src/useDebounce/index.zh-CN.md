---
title: useDebounce
group:
  title: SideEffect
  path: /side-effect
  order: 700
---

# useDebounce

用来处理防抖值的 Hook。

## 代码演示

### 基础使用

<code src="./demo/demo1.tsx" />

## API

```javascript
const debouncedValue = useDebounce(
  value: any,
  wait: number
);
```

### Params

| 参数  | 说明                     | 类型   | 默认值 |
|-------|--------------------------|--------|--------|
| value | 需要防抖的值         | any    | -      |
| wait  | 防抖等待时间，单位为毫秒 | number | 1000   |