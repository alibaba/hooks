---
title: useUpdateLayoutEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useUpdateLayoutEffect

A hook of useLayoutEffect that only runs when dependencies update.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

The API is exactly the same as React.useLayoutEffect.

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```