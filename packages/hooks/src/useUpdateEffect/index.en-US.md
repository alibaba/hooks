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

The API is exactly the same as React.useEffect.

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```