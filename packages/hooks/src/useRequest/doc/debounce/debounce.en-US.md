---
nav:
  path: /hooks
group:
  path: /use-request
---

# Debounce

Enter the debouce mode by setting `options.debounceWait`. At this time, if `run` or `runAsync` is triggered frequently, the request will be executed with the debounce strategy.

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

The usage and effect of all debounce property are the same as [lodash.debounce](https://www.lodashjs.com/docs/lodash.debounce/)

| Property         | Description                                                                 | Type      | Default Value |
|------------------|-----------------------------------------------------------------------------|-----------|---------------|
| debounceWait     | Debounce wait time, in milliseconds. After setting, enter the debounce mode | `number`  | -             |
| debounceLeading  | Called before the delay starts                                              | `boolean` | `false`       |
| debounceTrailing | Called after the delay ends                                                 | `boolean` | `true`        |
| debounceMaxWait  | The maximum time func is allowed to be delayed before it’s invoked          | `number`  | -             |

## Remark

* `options.debounceWait`, `options.debounceLeading`, `options.debounceTrailing`, `options.debounceMaxWait` support dynamic changes.
* `runAsync` will return a Promise when it is actually executed. When it is not executed, there will be no return.
* `cancel` can abort a function waiting to be executed.
