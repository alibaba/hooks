---
title: useDocumentVisibility
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-document-visibility
---

# useDocumentVisibility

https://developer.mozilla.org/docs/Web/API/Document/visibilityState

A Hook can tell if the page is visible

## Examples


<code src="./demo/demo1.tsx" />


## API

```
const  documentVisibility = useDocumentVisibility();
```

### Result
| Property    | Description                      | Type                   | Value |
|---------|----------------------------------------------|------------------------|--------|
| documentVisibility | Determine if the document is visible | string | 'visible' \| 'hidden' \| 'prerender'  \| true    |
