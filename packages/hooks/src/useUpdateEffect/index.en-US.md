---
title: useUpdateEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useUpdateEffect

A hook of useEffect that only runs when dependencies update.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useUpdateEffect(
  effect: (prevDeps?: deps) => ReturnType<React.EffectCallback>,
  deps?: deps,
)
```

### Params

| Property | Description                                        | Type                                      | Default |
|----------|----------------------------------------------------|-------------------------------------------|---------|
| effect   | Executable function                                | `(prevDeps?: deps) => ReturnType<React.EffectCallback>` | -       |
| deps     | Optionally, pass in objects that depend on changes |   `array` \| `undefined`                 | -       |
