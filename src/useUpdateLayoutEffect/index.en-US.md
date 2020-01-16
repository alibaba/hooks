---
title: useUpdateLayoutEffect
group:
  title: LifeCycle Hooks
  path: /LifeCycle
---

# useUpdateLayoutEffect

A hook of useLayoutEffect that only runs when dependencies update.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
useUpdateLayoutEffect(
  effect: () => (void | (() => void | undefined)),
  deps?: deps,
)
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| effect | Executable function  | () => (void | (() => void | undefined)) | -      |
| deps | Optionally, pass in objects that depend on changes | array \| undefined | -      |