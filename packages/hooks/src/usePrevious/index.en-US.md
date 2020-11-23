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

A Hook to store the previous value.


## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Using compare function

<code src="./demo/demo2.tsx" />

## API

```typescript
const previousState: T = usePrevious<T>(
  state: T,
  compareFunction: (prev: T | undefined, next: T) => boolean
);
```

### Result

| Property      | Description        | Type |
|---------------|--------------------|------|
| previousState | the previous value | -    |

### Params

| Property        | Description                                                   | Type | Default |
|-----------------|---------------------------------------------------------------|------|---------|
| state           | the state need to be tracked                                  | -    | -       |
| compareFunction | optional, customize when the previous value need to be stored |  (prev: T \| undefined, next: T) => boolean    | -       |
