---
nav:
  path: /hooks
---

# useDisableHistory

Disable browser history forward and backward and provide callbacks.


## Examples

### Basic usage

<code src="./demo/demo1.tsx" />



### Advanced usage

<code src="./demo/demo2.tsx" />

## API

```typescript
useDisableHistory()
```

```typescript
useDisableHistory({
  callback: () => {
    // do something here
    console.log("useDisableHistory callback trigger");
  },
  url: document.URL,
  shouldRefresh: true, // refresh current page
});
```

### Params

| 参数         | 说明         | 类型  | 默认值 |
|--------------|--------------|-------|--------|
| callback | Optional, callback function after the interception | `(url: string) => void` | - |
| url | Optional, the third argument to pushState | `string` | document.URL      |
| shouldRefresh | Optional, whether to refresh after interception | `boolean` | false      |