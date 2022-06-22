---
nav:
  path: /hooks
group:
  path: /use-request
---

# RefreshOnWindowFocus

By setting `options.refreshOnWindowFocus`, the request will be refreshed when the browser is `refocus` and `revisible`.

```tsx | pure
const { data } = useRequest(getUsername, {
  refreshOnWindowFocus: true,
});
```

You can click outside the browser, and then click the current page to experience the effect (or hide the current page and redisplay). If the interval from the previous request is greater than 5000ms, it will be requested again.

<code src="./demo/refreshOnWindowFocus.tsx" />

## API

### Options

| Property             | Description                                                              | Type      | Default |
| -------------------- | ------------------------------------------------------------------------ | --------- | ------- |
| refreshOnWindowFocus | Whether to re-initiate the request when the screen refocus or revisible. | `boolean` | `false` |
| focusTimespan        | Re-request interval, in milliseconds                                     | `number`  | `5000`  |

## Remark

- `options.refreshOnWindowFocus`, `options.focusTimespan` support dynamic changes.
- Listen for browser events `visibilitychange` and `focus`.
