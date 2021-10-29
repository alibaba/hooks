---
title: useFavicon
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useFavicon

A hook that set the favicon of the page.

## Example

### Basic Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useFavicon(href: string)
```

### Params

| Params | Description                                  | Type     | Default |
|--------|----------------------------------------------|----------|---------|
| href   | favicon URL, support `svg`/`png`/`ico`/`gif` | `string` | -       |
