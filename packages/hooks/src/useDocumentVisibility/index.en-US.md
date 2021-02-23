---
title: useDocumentVisibility
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useDocumentVisibility

A Hook can tell if the page is visible.

[visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## Examples

<code src="./demo/demo1.tsx" />

## API

```typescript
const documentVisibility = useDocumentVisibility();
```

### Result
| Property    | Description                      | Type                   |
|---------|----------------------------------------------|------------------------|
| documentVisibility | Determine if the document is visible | `visible`\| `hidden` \| `prerender`  \| `undefined` |
