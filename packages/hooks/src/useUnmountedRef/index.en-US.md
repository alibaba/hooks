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

a hook of whether the current component has been unmounted, used to avoid memory leaks caused by updating the state after the component has been unmounted

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const unmountRef: { current: boolean } = useUnmountedRef;
```

### Result

| Property | Description                      | Type         |
|----------|----------------------------------|--------------|
| unmountRef | the object's property 'current' can return whether the current component has been unmounted | `{ current: boolean }` |
