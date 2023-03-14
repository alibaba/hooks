---
nav:
   path: /hooks
group:
   path: /use-request
---

# Loading Delay

By setting `options.loadingDelay`, you can delay the time when `loading` turns to `true`, effectively prevent UI flashing.

```tsx | pure
const { loading, data } = useRequest(getUsername, {
   loadingDelay: 300
});

return <div>{ loading ? 'Loading...' : data }</div>
```

For example, in the above scenario, if `getUsername` returns within 300ms, `loading` will not become `true`, avoiding the page displays `Loading...`.

You can quickly click the button in the example below to experience the effect

<code src="./demo/loadingDelay.tsx" />

## API

| Property     | Description                                       | Type     | Default |
| ------------ | ------------------------------------------------- | -------- | ------- |
| loadingDelay | Set the delay time for `loading` to become `true` | `number` | `0`     |

## Remark

`options.loadingDelay` supports dynamic changes.
