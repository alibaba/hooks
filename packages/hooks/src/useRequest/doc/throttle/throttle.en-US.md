---
nav:
  path: /hooks
group:
  path: /use-request
---

# Throttle

Enter the throttle mode by setting `options.throttleWait`. At this time, if `run` or `runAsync` is triggered frequently, the request will be executed with the throttle strategy.

```tsx | pure
const { data, run } = useRequest(getUsername, {
  throttleWait: 300,
  manual: true
});
```

As in the example code above, if `run` is triggered frequently, it will only be executed once every 300ms.

You can quickly enter text in the input box below to experience the effect

<code src="./demo/throttle.tsx" />

## API

### Options

The usage and effects of all throttle property are the same as [lodash.throttle](https://lodash.com/docs/4.17.15#throttle)

| Property         | Description                                                                 | Type      | Default Value |
| ---------------- | --------------------------------------------------------------------------- | --------- | ------------- |
| throttleWait     | Throttle wait time, in milliseconds. After setting, enter the throttle mode | `number`  | -             |
| throttleLeading  | Execute the request before throttling starts                                | `boolean` | `true`        |
| throttleTrailing | Execute the request after throttling ends                                   | `boolean` | `true`        |

## Remark

- `options.throttleWait`, `options.throttleLeading`, `options.throttleTrailing` support dynamic changes.
- `runAsync` will return a `Promise` when it is actually executed. When it is not executed, there will be no return.
- `cancel` can abort a function waiting to be executed.
