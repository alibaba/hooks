---
title: useLatest
nav: Hooks
group:
  title: Advanced
  order: 7
order: 5
toc: content
demo:
  cols: 2
---

A Hook that returns the latest value, effectively avoiding the closure problem.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const latestValueRef = useLatest<T>(value: T): MutableRefObject<T>;
```
