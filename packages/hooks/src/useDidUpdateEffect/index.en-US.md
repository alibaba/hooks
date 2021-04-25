---
title: useDidUpdateEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useDidUpdateEffect

A hook of useEffect that simulation of ComponentDidUpdate.
 

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useDidUpdateEffect(
  effect: (prevDeps: deps) => ReturnType<React.EffectCallback>,
  deps?: deps,
)
```

### Params

| Property | Description                                        | Type                                      | Default |
|----------|----------------------------------------------------|-------------------------------------------|---------|
| effect   | Executable function                                | `(prevDeps: deps) => ReturnType<React.EffectCallback>` | -       |
| deps     | Optionally, pass in objects that depend on changes |   `DependencyList` \| `undefined`                 | -       |
