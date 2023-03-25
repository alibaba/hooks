---
nav:
  path: /hooks
---

# useGreetings

A hook that returns a greeting message based on the current time.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const greetings = useGreetings();
```

### Result

| Property   | Description | Type                              |
| ---------- | ----------- | --------------------------------- |
| `variable` | day state   | `morning/afternoon/evening/night` |
