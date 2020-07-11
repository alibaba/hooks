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

A Hook can tell if the page is visible.

[visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## Examples


<code src="./demo/demo1.tsx" />


## API

```
const  documentVisibility = useDocumentVisibility();
```

### Result
| Property    | Description                      | Type                   | Value |
|---------|----------------------------------------------|------------------------|--------|
| documentVisibility | Determine if the document is visible | string | 'visible' \| 'hidden' \| 'prerender'  \| undefined    |

> If no document environment returns `undefined`; At present，the visibilitychange API is in the Recommendation stage, and only one change will be triggered in the Safari browser, which is different from Chrome and Firefox.
