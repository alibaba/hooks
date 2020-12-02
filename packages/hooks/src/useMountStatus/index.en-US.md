---
title: useMount
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useMount

A hook that can get mount status of the current component

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const getMountStatus: () => boolean = useMountStatus;
```

### Params

| Property | Description                      | Type         | Default |
|----------|----------------------------------|--------------|---------|
| fn       | If the current component is mounted, it returns true; otherwise, it returns false | `() => boolean` | -       |
