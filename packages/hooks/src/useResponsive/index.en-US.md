---
nav:
  path: /hooks
---

# useResponsive

React Hook for getting responsive info.

## Examples

### Get responsive info in components

<code src="./demo/demo1.tsx" />

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

### Config

The default config is the same as bootstrap:

```javascript
{
  'xs': 0,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200,
}
```

If you want to config your own responsive breakpoints, you can use `configResponsive`:

(Caution: You only need to config it once. Don't call this config function repeatedly.)

```javascript
configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});
```
