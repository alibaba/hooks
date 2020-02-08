---
title: usePrevious
group:
  title: State
  path: /state
  order: 600
---

# usePrevious

A Hook to store the previous value


## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Using compare function

<code src="./demo/demo2.tsx" />

## API
```
const previousState: T = usePrevious<T>(
  state: T,
  compareFunction: (prev: T | undefined, next: T) => boolean
);
```

### Result

| Property | Description                                                       | Type                 |
|------|----------|------|
| previousState | the previous value | T  |

### Params

| Property | Description                                                       | Type                 | Default |
|---------|----------|------------------------|--------|
| state | the state need to be tracked | T | -      |
| compareFunction | optional, customize when the previous value need to be stored | (prev: T \| undefined, next: T) => boolean | -      |
