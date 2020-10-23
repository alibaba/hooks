---
title: useTrackedEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useTrackedEffect

A hook of useEffect that allow us to track which dependencies caused the effect to trigger.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```javascript
useTrackedEffect(
  effect: (changes:[]) => (void | (() => void | undefined)),
  deps?: deps,
)
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| effect | Executable function  | (changes:array) => (void | (() => void | undefined)) | -      |
| deps | Optionally, pass in objects that depend on changes | array \| undefined | -      |
