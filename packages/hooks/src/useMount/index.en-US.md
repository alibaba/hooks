---
nav:
  path: /hooks
---

# useMount

A hook that executes a function after the component is mounted.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useMount(fn: EffectCallback);
```

### Params

| Property | Description                 | Type         | Default |
| -------- | --------------------------- | ------------ | ------- |
| fn       | The function to be executed | `EffectCallback` | -       |
