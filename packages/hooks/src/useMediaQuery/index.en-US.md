---
nav:
  path: /hooks
---

# useMediaQuery

React Hook for getting responsive info.

## Examples

### Get responsive info in components

<code src="./demo/demo1.tsx" />

## API

```typescript
interface ResponsiveInfo {
  value: number;
  currentQuery: string;
}

function useMediaQuery(queries: K[], values: T[], defaultValue: T): ResponsiveInfo;
```
