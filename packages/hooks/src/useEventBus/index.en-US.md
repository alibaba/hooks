---
nav:
  path: /hooks
---

# useEventBus

`useEventBus` Be synonymous with `Bus.$on`，However, you can depend on the value of the state and remount the function when dependent on updates,Once subscribed, methods can be called from anywhere

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```typescript
// hooks 订阅
useEventBus('Subscription method name',Subscribe to callback methods,[dependency]);
```
