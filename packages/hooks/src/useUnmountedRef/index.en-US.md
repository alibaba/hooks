---
title: useUnmountedRef
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useUnmountedRef

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A Hook can be used to get whether the component is unmounted.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const unmountRef: { current: boolean } = useUnmountedRef();
```

### Result

| Property   | Description                      | Type                   |
|------------|----------------------------------|------------------------|
| unmountRef | Whether the component is unmounted | `{ current: boolean }` |
