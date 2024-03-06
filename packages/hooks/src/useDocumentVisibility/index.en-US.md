---
title: useDocumentVisibility
nav: Hooks
group:
  title: Dom
  order: 6
order: 3
toc: content
demo:
  cols: 2
---

A Hook can tell if the page is visible, refer to [visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const documentVisibility = useDocumentVisibility();
```

### Result

| Property           | Description                     | Type                                               |
| ------------------ | ------------------------------- | -------------------------------------------------- |
| documentVisibility | Whether the document is visible | `visible`\| `hidden` \| `prerender` \| `undefined` |
