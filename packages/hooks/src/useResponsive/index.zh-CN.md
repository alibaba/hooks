---
title: useResponsive
nav: Hooks
group:
  title: Dom
  order: 6
order: 16
toc: content
demo:
  cols: 2
---

获取响应式信息。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
interface ResponsiveConfig {
  [key: string]: number;
}
interface ResponsiveInfo {
  [key: string]: boolean;
}
function configResponsive(config: ResponsiveConfig): void;
function useResponsive(): ResponsiveInfo;
```

## 配置

默认的响应式配置和 bootstrap 是一致的：

```javascript
{
  'xs': 0,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200,
}
```

如果你想配置自己的响应式断点，可以使用 `configResponsive` ：

（注意：只需配置一次，请勿在组件中重复调用该方法）

```javascript
configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});
```
