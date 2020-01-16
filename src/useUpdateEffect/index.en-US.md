---
title: useUpdateEffect
group:
  title: LifeCycle Hooks
  path: /LifeCycle
---

# useUpdateEffect

A hook that elegantly manages boolean values.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
useUpdateEffect(
  effect: () => (void | (() => void | undefined)),
  deps?: deps,
)
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| effect | Executable function  | () => (void | (() => void | undefined)) | -      |
| deps | Optionally, pass in objects that depend on changes | array \| undefined | -      |