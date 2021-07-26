---
title: usePrevious
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# usePrevious

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A Hook to store the previous value.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Custom shouldUpadte function

<code src="./demo/demo2.tsx" />

## API

```typescript
const previousState: T = usePrevious<T>(
  state: T,
  shouldUpdate?: (prev: T | undefined, next: T) => boolean
);
```

### Result

| Property      | Description        | Type  |
|---------------|--------------------|-------|
| previousState | The previous value | `any` |

### Params

| Property     | Description                                                   | Type                                         | Default             |
|--------------|---------------------------------------------------------------|----------------------------------------------|---------------------|
| state        | The state need to be tracked                                  | `any`                                        | -                   |
| shouldUpdate | Optional, customize when the previous value need to be stored | `(prev: T \| undefined, next: T) => boolean` | `(a, b) => a !== b` |
