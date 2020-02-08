---
title: useAsync
group:
  title: Deprecated
  path: /deprecated
  order: 300
---

# useAsync

<Alert>
<b>⚠️WARNING: useAsync is deprecated and will be removed in the next major version. Please use <a href="/async">useRequest</a> instead.</b>
</Alert>

A custom hook that helps you manage async functions and their returned data.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Manually triggered

<code src="./demo/demo2.tsx" />

### Polling

<code src="./demo/demo3.tsx" />

### Form Submission

<code src="./demo/demo4.tsx" />

## API

```javascript
const result: Result = useAsync<T>(
  asyncFn: (value: any) => Promise<T>,
  options?: Options,
);

const result: Result = useAsync<T>(
  asyncFn: (value: any) => Promise<T>,
  deps?: any[],
  options?: Options,
);
```

### Result

| Property     | Description                                  | Type                            |
|--------------|----------------------------------------------|---------------------------------|
| loading      | whether the async function is resolved       | boolean                         |
| params       | the params you passed to that async function | any[]                           |
| error        | the Error that async function throwed        | Error                           |
| data         | the result that async function resolved      | any                             |
| cancel       | drop the async function result               | () => void                      |
| run          | running the async function                   | (...args: any[]) => Promise<T\> |
| timer.stop   | stop polling                                 | () => void                      |
| timer.pause  | pause pollinng                               | () => void                      |
| timer.resume | resume polling                               | () => void                      |


### Params

| Property | Description                         | Type             | Default        |
|----------|-------------------------------------|------------------|----------------|--|
| service  | the async function  itself          | (...args: Args \ | any)=> Promise | - |
| deps     | dependencyList                      | any[]            | []             |  |
| options  | advanced options，see Options below | -                | -              |  |

### Options

| Property        | Description                                                                        | Type                              | Default |
|-----------------|------------------------------------------------------------------------------------|-----------------------------------|---------|
| manual          | whether the function need to be triggered mannually                                | boolean                           | false   |
| pollingInterval | the polling interval, enable polling only if this property is set. (numbers in ms) | number                            | -       |
| onSuccess       | the callback when async function runs successfully                                 | (d: T, params: any[]) => void     | -       |
| onError         | the callback when async function fails                                             | (e: Error, params: any[]) => void | -       |
| autoCancel      | whether to drop the result when deps change or component unmount                   | boolean                           | true    |
