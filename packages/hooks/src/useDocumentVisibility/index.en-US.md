---
nav:
  path: /hooks
---

# useDocumentVisibility

A Hook can tell if the page is visible, refer to [visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## Examples

<code src="./demo/demo1.tsx" />

## API

```typescript
const documentVisibility = useDocumentVisibility();
```

### Result

| Property           | Description                     | Type                                               |
| ------------------ | ------------------------------- | -------------------------------------------------- |
| documentVisibility | Whether the document is visible | `visible`\| `hidden` \| `prerender` \| `undefined` |
