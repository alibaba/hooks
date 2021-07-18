---
title: useDeepCompareEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useDeepCompareEffect

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

Usage is the same as useEffect, but deps use [lodash.isEqual](https://lodash.com/docs/4.17.15#isEqual) to compare.


## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useDeepCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```