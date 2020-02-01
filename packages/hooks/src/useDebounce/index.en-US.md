---
title: useDebounce
group:
  title: SideEffect Hook
  path: /sideEffect
---

# useDebounce

A hook that handle the debounce value.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const debouncedValue = useDebounce(
  value: any,
  wait: number
);
```

### Params

| Property | Description                  | Type   | Default |
|----------|------------------------------|--------|---------|
| value    | value that requires debounce | any    | -       |
| wait     | wait time in milliseconds    | number | 1000    |