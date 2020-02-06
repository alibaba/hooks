---
title: useAPI
group:
  title: Deprecated
  path: /deprecated
  order: 300
---

# useAPI

<Alert>
<b>⚠️WARNING: useAPI is deprecated and will be removed in the next major version. Please use <a href="/async">useRequest</a> instead.</b>
</Alert>

A custom hook that helps you sending and receiving data from server, using `umi-request` as default request library.
Supporting manual-trigged fetch and fetch in interval.
> This hook is meant to show a practice of wrapping useAsync. You may not need umi-request in your project. However, you can wrap your own useAPI accoding to [the way useAPI do it](https://github.com/umijs/hooks/blob/master/src/useAPI/index.ts). You can add request headers, transform data structures, or do some common error handling here. if our useAPI works in your project, you can also directly use it for sure.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />


### Sending request manually

<code src="./demo/demo2.tsx" />


### Polling

<code src="./demo/demo3.tsx" />


### Modifying the request method

<code src="./demo/demo4.tsx" />


## API

See [useAsync](./useAsync)