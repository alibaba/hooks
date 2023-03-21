---
nav:
  path: /hooks
---

# useFavicon

A hook that set the favicon of the page.

`useFavicon` doesn't work in Safari because Safari cannot set the favion dynamically.

> Apple intentionally do not want the ability to script favicons. See https://bugs.webkit.org/show_bug.cgi?id=95979#c2 for common.

## Example

### Basic Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useFavicon(href: string);
```

### Params

| Params | Description                                  | Type     | Default |
| ------ | -------------------------------------------- | -------- | ------- |
| href   | favicon URL, support `svg`/`png`/`ico`/`gif` | `string` | -       |
