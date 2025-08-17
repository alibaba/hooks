---
nav:
  path: /hooks
group:
  path: /use-request
---

# Debounce

Enter the debounce mode by setting `options.debounceWait`. At this time, if `run` or `runAsync` is triggered frequently, the request will be executed with the debounce strategy.

```tsx | pure
const { data, run } = useRequest(getUsername, {
  debounceWait: 300,
  manual: true
});
```

As in the example code above, if `run` is triggered frequently, it will only wait for 300ms to execute after the last trigger.

You can quickly enter text in the input box below to experience the effect

<code src="./demo/debounce.tsx" />

## API

### Options

The usage and effect of all debounce property are the same as [lodash.debounce](https://lodash.com/docs/4.17.15#debounce)

| Property         | Description                                                                  | Type      | Default Value |
| ---------------- | ---------------------------------------------------------------------------- | --------- | ------------- |
| debounceWait     | Debounce delay time, in milliseconds. After setting, enter the debounce mode | `number`  | -             |
| debounceLeading  | Execute the request before the delay starts                                  | `boolean` | `false`       |
| debounceTrailing | Execute the request after the delay ends                                     | `boolean` | `true`        |
| debounceMaxWait  | The maximum time request is allowed to be delayed before it’s executed       | `number`  | -             |

## Remark

- `options.debounceWait`, `options.debounceLeading`, `options.debounceTrailing`, `options.debounceMaxWait` support dynamic changes.
- `runAsync` will return a `Promise` when it is actually executed. When it is not executed, there will be no return.
- `cancel` can abort a function waiting to be executed.
