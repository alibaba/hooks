---
nav:
  path: /hooks
---

# useStateRef
To deal with the closure problem, there is an additional function to get the latest state on the basis of useState

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [value, setValue, getValue] = useStateRef(false);
```
