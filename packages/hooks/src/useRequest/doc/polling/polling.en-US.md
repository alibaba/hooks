---
nav:
  path: /hooks
group:
  path: /use-request
---

# Polling

By setting `options.pollingInterval`, enter the polling mode, `useRequest` will periodically trigger service execution.

```tsx | pure
const { data, run, cancel } = useRequest(getUsername, {
  pollingInterval: 3000,
});
```

For example, in the above scenario, `getUsername` will be requested every 3000ms. You can stop polling by `cancel` and start polling by `run/runAsync`.

You can experience the effect through the following example

<code src="./demo/polling.tsx" />

## Polling error retry

Polling by `options. PollingErrorRetryCount` configuration error retry count.

```tsx | pure
const { data, run, cancel } = useRequest(getUsername, {
  pollingInterval: 3000,
  pollingErrorRetryCount: 3,
});
```

You can experience the effect through the following example.

<code src="./demo/pollingError.tsx" />

## API

### Return

| Property | Description   | Type                                     |
| -------- | ------------- | ---------------------------------------- |
| run      | Start polling | `(...params: TParams) => void`           |
| runAsync | Start polling | `(...params: TParams) => Promise<TData>` |
| cancel   | Stop polling  | `() => void`                             |

### Options

| Property               | Description                                                                                                                                                                  | Type      | Default |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| pollingInterval        | Polling interval, in milliseconds. If the value is greater than 0, the polling mode is activated.                                                                            | `number`  | `0`     |
| pollingWhenHidden      | Whether to continue polling when the page is hidden. If set to false, polling will be temporarily paused when the page is hidden, and resume when the page is visible again. | `boolean` | `true`  |
| pollingErrorRetryCount | Number of polling error retries. If set to -1, an infinite number of times                                                                                                   | `number`  | `-1`    |

## Remark

- `options.pollingInterval`, `options.pollingWhenHidden` support dynamic changes.
- If you set `options.manual = true`, the initialization will not start polling, you need start it by `run/runAsync`.
- If the `pollingInterval` changes from 0 to a value greater than 0, polling will not start automatically, and you need start it by `run/runAsync`.
- The polling logic is to wait for `pollingInterval` time after each request is completed, and then initiate the next request.
