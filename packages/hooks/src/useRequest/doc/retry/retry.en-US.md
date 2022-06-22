---
nav:
  path: /hooks
group:
  path: /use-request
---

# Error Retry

By setting `options.retryCount`, set the number of error retries, useRequest will retry after it fails.

```tsx | pure
const { data, run } = useRequest(getUsername, {
  retryCount: 3,
});
```

As in the example code above, after the request is failed, it will retry 3 times.

You can type text in the input box below and click the Edit button to experience the effect

<code src="./demo/retry.tsx" />

## API

### Options

| Property      | Description                                                                                                                                                                                                                                                                                          | Type     | Default |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| retryCount    | The number of retries. If set to `-1`, it will try again indefinitely.                                                                                                                                                                                                                               | `number` | -       |
| retryInterval | <ul><li>Retry interval in milliseconds. </li><li>If not set, the simple exponential backoff algorithm will be used by default, taking `1000 * 2 ** retryCount`, that is, waiting for 2s for the first retry, and 4s for the second retry. By analogy, if it is greater than 30s, take 30s </li></ul> | `number` | -       |

## Remark

- `options.retryCount`, `options.retryInterval` support dynamic changes.
- `cancel` can cancel the ongoing retry behavior.
