---
title: useTrackedEffect
nav: Hooks
group:
  title: Dev
  order: 8
order: 1
toc: content
demo:
  cols: 2
---

A hook of useEffect that allow us to track which dependencies caused the effect to trigger.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useTrackedEffect(
  effect: (changes: [], previousDeps: [], currentDeps: []) => (void | (() => void | undefined)),
  deps?: deps,
)
```

The API is alike `React.useEffect`, but the first function will receive three parameters: `changes`, `previousDeps`, and `currentDeps`.

- changes: Index of changed dependencies
- previousDeps: Last deps
- currentDeps: Current deps
