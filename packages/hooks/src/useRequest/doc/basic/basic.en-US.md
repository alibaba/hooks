---
nav:
  path: /hooks
group:
  path: /use-request
---

# Basic usage

In this section, we will introduce the core and basic functionalities of `useRequest`, that is, the functionalities of the `useRequest` kernel.

## Default request

By default, the first parameter of `useRequest` is an asynchronous function, which is automatically executed when the component is initialized. At the same time, it automatically manages the status of `loading`, `data`, `error` of the asynchronous function.

```js
const { data, error, loading } = useRequest(service);
```

<br />

<code src="./demo/default.tsx" />

## Manually trigger

If `options.manual = true` is set, `useRequest` will not be executed by default, and the execution needs to be triggered by `run` or `runAsync`.

```tsx | pure
const { loading, run, runAsync } = useRequest(service, {
  manual: true
});

<button onClick={run} disabled={loading}>
  {loading ? 'Loading' : 'Edit'}
</button>
```

The difference between `run` and `runAsync` is:

- `run` is a normal synchronous function, we will automatically catch the exception, you can use `options.onError` to handle the behavior of the exception.
- `runAsync` is a asynchronous function that returns a `Promise`. If you use `runAsync` to call it, it means you need to catch the exception yourself.

  ```ts
  runAsync().then((data) => {
    console.log(data);
  }).catch((error) => {
    console.log(error);
  })
  ```

Next, we will demonstrate the difference between `run` and `runAsync` through the simple scenario of editing the username.

<code src="./demo/manual-run.tsx" />

<code src="./demo/manual-runAsync.tsx" />

## The life cycle

`useRequest` provides the following life cycle for you to do some processing in different stages of asynchronous functions.

- `onBefore`: Triggered before the request
- `onSuccess`: Triggered when the request is resolved
- `onError`: Triggered when the request is rejected
- `onFinally`: Triggered when the request is completed

<code src="./demo/lifeCycle.tsx" />

## Refresh (repeat the last request)

`useRequest` provides the `refresh` and `refreshAsync` methods so that we can use the last parameters to re-run the request.

If in the scenario of reading user information

1. We read the user information with ID 1 `run(1)`
2. We updated user information by some ways
3. We want to re-initiate the last request, then we can use `refresh` instead of `run(1)`, which is very useful in scenarios with complex parameters

<code src="./demo/refresh.tsx" />

Of course, the difference between `refresh` and `refreshAsync` is the same as `run` and `runAsync`.

## Change data immediately

`useRequest` provides `mutate`, which can immediate modify the `data`.

The usage of `mutate` is consistent with `React.setState`, supports: `mutate(newData)` and `mutate((oldData) => newData)`.

In the following example, we demonstrate a scenario of `mutate`.

We have modified the user name, but we do not want to wait for the request to be successful before giving feedback to the user. Instead, modify the data directly, then call the modify request in background, and provide additional feedback after the request returns.

<code src="./demo/mutate.tsx" />

<!-- ## Format data

`useRequest` provides the `formatResult` configuration item, which can format the data returned by the service once. If `formatResult` is configured, the return value of other places where `data` is used shall prevail, such as the parameters of `result.data`, `options.onSuccess` and so on. -->

<!-- <code src="./demo/formatResult.tsx" /> -->

## Cancel response

`useRequest` provides a `cancel` function, which will **ignore** the data and error returned by the current promise

**Note: Calling `cancel` doesn't cancel the execution of promise**

At the same time, `useRequest` will automatically ignore the response at the following timing:

- When the component is unmounting, the ongoing promise
- Race cancellation, when the previous promise has not returned, if the next promise is initiated, the previous promise will be ignored

<code src="./demo/cancel.tsx" />

## Parameter management

The `params` returned by `useRequest` will record the parameters of `service`. For example, if you trigger `run(1, 2, 3)`, then `params` is equal to `[1, 2, 3]`.

If we set `options.manual = false`, the parameters of calling `service` for the first time can be set by `options.defaultParams`.

<code src="./demo/params.tsx" />

## API

```ts
const {
  loading: boolean,
  data?: TData,
  error?: Error,
  params: TParams || [],
  run: (...params: TParams) => void,
  runAsync: (...params: TParams) => Promise<TData>,
  refresh: () => void,
  refreshAsync: () => Promise<TData>,
  mutate: (data?: TData | ((oldData?: TData) => (TData | undefined))) => void,
  cancel: () => void,
} = useRequest<TData, TParams>(
  service: (...args: TParams) => Promise<TData>,
  {
    manual?: boolean,
    defaultParams?: TParams,
    onBefore?: (params: TParams) => void,
    onSuccess?: (data: TData, params: TParams) => void,
    onError?: (e: Error, params: TParams) => void,
    onFinally?: (params: TParams, data?: TData, e?: Error) => void,
  }
);
```

### Result

| Property     | Description                                                                                                                                                                             | Type                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| data         | Data returned by service                                                                                                                                                                | `TData` \| `undefined`                                                |
| error        | Exception thrown by service                                                                                                                                                             | `Error` \| `undefined`                                                |
| loading      | Is the service being executed                                                                                                                                                           | `boolean`                                                             |
| params       | An array of parameters for the service being executed. For example, you triggered `run(1, 2, 3)`, then params is equal to `[1, 2, 3]`                                                   | `TParams` \| `[]`                                                     |
| run          | <ul><li> Manually trigger the execution of the service, and the parameters will be passed to the service</li><li>Automatic handling of exceptions, feedback through `onError`</li></ul> | `(...params : TParams) => void`                                       |
| runAsync     | The usage is the same as `run`, but it returns a Promise, so you need to handle the exception yourself.                                                                                 | `(...params: TParams) => Promise<TData>`                              |
| refresh      | Use the last params, call `run` again                                                                                                                                                   | `() => void`                                                          |
| refreshAsync | Use the last params, call `runAsync` again                                                                                                                                              | `() => Promise<TData>`                                                |
| mutate       | Mutate `data` directly                                                                                                                                                                  | `(data?: TData / ((oldData?: TData) => (TData / undefined))) => void` |
| cancel       | Ignore the current promise response                                                                                                                                                     | `() => void`                                                          |

### Options

| Property      | Description                                                                                                                                                                                                      | Type                                                 | Default |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------- |
| manual        | <ul><li> The default is `false`. That is, the service is automatically executed during initialization. </li><li>If set to `true`, you need to manually call `run` or `runAsync` to trigger execution. </li></ul> | `boolean`                                            | `false` |
| defaultParams | The parameters passed to the service at the first default execution                                                                                                                                              | `TParams`                                            | -       |
| onBefore      | Triggered before service execution                                                                                                                                                                               | `(params: TParams) => void`                          | -       |
| onSuccess     | Triggered when service resolve                                                                                                                                                                                   | `(data: TData, params: TParams) => void`             | -       |
| onError       | Triggered when service reject                                                                                                                                                                                    | `(e: Error, params: TParams) => void`                | -       |
| onFinally     | Triggered when service execution is complete                                                                                                                                                                     | `(params: TParams, data?: TData, e?: Error) => void` | -       |

Above we have introduced the most basic functionalities of useRequest, and then we will introduce some more advanced functionalities.
