---
title: useCursor
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useCursor

set input cursor

## Example


<code src="./demo/demo1.tsx" />
<code src="./demo/demo2.tsx" />

## API

```typescript
const [recordCursor, restoreCursor] = useCursor(inputRef.current: HTML, focus: boolean)
```

### Params

| Params     | Description                                  | Type     | Default |
|------------|----------------------------------------------|----------|---------|
| inputRef | input  | HTML | -      |
| focus | input focus | boolean | -      |
