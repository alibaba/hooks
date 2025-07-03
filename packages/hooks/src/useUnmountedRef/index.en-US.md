---
title: useUnmountedRef
nav: Hooks
group:
  title: LifeCycle
  order: 3
order: 3
toc: content
demo:
  cols: 2
---

A Hook can be used to get whether the component is unmounted.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const unmountRef: { current: boolean } = useUnmountedRef();
```

### Result

| Property   | Description                        | Type                   |
| ---------- | ---------------------------------- | ---------------------- |
| unmountRef | Whether the component is unmounted | `{ current: boolean }` |
