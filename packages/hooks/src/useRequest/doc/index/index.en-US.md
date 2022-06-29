---
nav:
  path: /hooks
group:
  path: /use-request
---

# Quick Start

`useRequest` is a powerful Hooks for asynchronous data management. `useRequest` is sufficient enough for network request scenarios in React projects.

`useRequest` organizes code through a plug-in pattern, the core code is extremely simple, and can be easily extended for more advanced features. Current features include:

- Automatic/manual request
- Polling
- Debounce
- Throttle
- Refresh on window focus
- Error retry
- Loading delay
- SWR(stale-while-revalidate)
- Caching

Next, let's get to know `useRequest` from the two simplest examples.

## Default usage

The first parameter of `useRequest` is an asynchronous function, which will be automatically triggered when the component is first loaded. At the same time, it automatically manages the status of `loading`, `data`, `error` of the asynchronous function.

```js
const { data, error, loading } = useRequest(getUsername);
```

<br />

<code src="./demo/default.tsx" />

## Manual trigger

If `options.manual = true` is set, useRequest will not be executed by default, and the execution needs to be triggered by `run`.

```js
const { loading, run } = useRequest(changeUsername, {
  manual: true
});
```

<br />

<code src="./demo/manual.tsx" />

In the above two examples, we demonstrated the most basic usages of `useRequest`. Next, we will introduce the features of `useRequest` one by one.
