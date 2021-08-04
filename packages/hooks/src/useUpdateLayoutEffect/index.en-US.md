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

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook alike `useLayoutEffect` but skips running the effect for the first time.

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