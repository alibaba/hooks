---
nav:
  path: /hooks
---

# useInfiniteScroll

useInfiniteScroll encapsulates the common infinite scroll logic.

```js
const { data, loading, loadingMore, loadMore } = useInfiniteScroll(service);
```

The first parameter `service` of useInfiniteScroll is an asynchronous function. The input and output parameters of this function have the following conventions:

1. The data returned by `service` must contain a `list` array, the type is `{ list: any[], ...rest }`
2. The input parameter of `service` is the latest merged `data`

If the data returned for the first request is `{ list: [1, 2, 3], nextId: 4 }`, the data returned for the second time is `{ list: [4, 5, 6], nextId: 7 }` , then we will automatically merge `list`, and the merged `data` will be `{ list: [1, 2, 3, 4, 5, 6], nextId: 7 }`.

## Basic usage

In the first example, we demonstrate the implementation of a most basic infinite scroll.

<code src="./demo/default.tsx" />

## Pagination

In the data fixation scenario, we sometimes use `page` and `pageSize` to request new data.

<code src="./demo/pagination.tsx" />

## Scrolling to automatically load

In the infinite scrolling scenario, the most common case is to automatically load when scrolling to the bottom. By configuring the following properties, you can achieve scrolling to automatically load.

- `options.target` specifies the parent element, The parent element needs to set a fixed height and support internal scrolling
- `options.isNoMore` determines if there is no more data
- `options.direction` determines the direction of scrolling, the default is `bottom`

the scroll to bottom demo
<code src="./demo/scroll.tsx" />

the scroll to top demo
<code src="./demo/scrollTop.tsx" />

## Data reset

The data can be reset by `reload`. The following example shows that after the `filter` changes, the data is reset to the first page.

<code src="./demo/reload.tsx" />

The above code can be implemented with `reloadDeps` syntax sugar. When `reloadDeps` changes, `reload` will be triggered automatically.

```ts
const result = useInfiniteScroll(service, {
  reloadDeps: [keyword]
});
```

## Data mutation

With `mutate`, we can directly modify the current `data`. The following example demonstrates deleting a record from the data.

<code src="./demo/mutate.tsx" />

## API

```ts
export type Data = { list: any[];[key: string]: any; };
export type Service<TData extends Data> = (currentData?: TData) => Promise<TData>;

const {
  data: TData;
  loading: boolean;
  loadingMore: boolean;
  error?: Error;
  noMore: boolean;
  loadMore: () => void;
  loadMoreAsync: () => Promise<TData>;
  reload: () => void;
  reloadAsync: () => Promise<TData>;
  cancel: () => void;
  mutate: (data?: TData) => void;
} = useInfiniteScroll<TData extends Data>(
  service: (currentData?: TData) => Promise<TData>,
  {
    target?: BasicTarget;
    isNoMore?: (data?: TData) => boolean;
    threshold?: number;
    manual?: boolean;
    reloadDeps?: DependencyList;
    onBefore?: () => void;
    onSuccess?: (data: TData) => void;
    onError?: (e: Error) => void;
    onFinally?: (data?: TData, e?: Error) => void;
  }
);
```

### Result

| Property      | Description                                                                                                                                       | Type                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| data          | The data returned by the service, where the `list` attribute is the aggregated data                                                               | `TData` \| `undefined`   |
| loading       | Is the first request in progress                                                                                                                  | `boolean`                |
| loadingMore   | Is more data request in progress                                                                                                                  | `boolean`                |
| noMore        | Whether there is no more data, it will take effect after configuring `options.isNoMore`                                                           | `boolean`                |
| error         | Request error message                                                                                                                             | `Error`                  |
| loadMore      | Load more data, it will automatically catch the exception, and handle it through `options.onError`                                                | `() => void`             |
| loadMoreAsync | Load more data, which is consistent with the behavior of `loadMore`, but returns Promise, so you need to handle the exception yourself            | `() => Promise<TData>`   |
| reload        | Load the first page of data, it will automatically catch the exception, and handle it through `options.onError`                                   | `() => void`             |
| reloadAsync   | Load the first page of data, which is consistent with the behavior of `reload`, but returns Promise, so you need to handle the exception yourself | `() => Promise<TData>`   |
| mutate        | Modify `data` directly                                                                                                                            | `(data?: TData) => void` |
| cancel        | Ignore the current promise response                                                                                                               | `() => void`             |

### Options

| Property   | Description                                                                                                                                                                                                                                          | Type                                                        | Default  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------- |
| target     | specifies the parent element. If it exists, it will trigger the `loadMore` when scrolling to the bottom. Needs to work with `isNoMore` to know when there is no more data to load. **when target is document, it is defined as the entire viewport** | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -        |
| isNoMore   | determines if there is no more data, the input parameter is the latest merged `data`                                                                                                                                                                 | `(data?: TData) => boolean`                                 | -        |
| threshold  | The pixel threshold to the bottom for the scrolling to load                                                                                                                                                                                          | `number`                                                    | `100`    |
| direction  | The direction of the scrolling                                                                                                                                                                                                                       | `bottom` \|`top`                                            | `bottom` |
| reloadDeps | When the content of the array changes, `reload` will be triggered                                                                                                                                                                                    | `any[]`                                                     | -        |
| manual     | <ul><li> The default is `false`. That is, the service is automatically executed during initialization. </li><li>If set to `true`, you need to manually call `run` or `runAsync` to trigger execution </li></ul>                                      | `boolean`                                                   | `false`  |
| onBefore   | Triggered before service execution                                                                                                                                                                                                                   | `() => void`                                                | -        |
| onSuccess  | Triggered when service resolve                                                                                                                                                                                                                       | `(data: TData) => void`                                     | -        |
| onError    | Triggered when service reject                                                                                                                                                                                                                        | `(e: Error) => void`                                        | -        |
| onFinally  | Triggered when service execution is complete                                                                                                                                                                                                         | `(data?: TData, e?: Error) => void`                         | -        |
