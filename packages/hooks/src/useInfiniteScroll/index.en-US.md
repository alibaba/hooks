---
nav:
  path: /hooks
---
# useInfiniteScroll

useInfiniteScroll encapsulates the common infinite scroll logic.

```js
const {data, loading, loadingMore, loadMore} = useInfiniteScroll(service);
```

The first parameter `service` of useInfiniteScroll is an asynchronous function. The input and output parameters of this function have the following conventions:

1. The data returned by `service` must contain a `list` array, the type is `{ list: any[], ...rest }`
2. The input parameter of `service` is the latest integrated `data`

If the data returned for the first request is `{ list: [1, 2, 3], nextId: 4}`, the data returned for the second time is `{ list: [4, 5, 6], nextId: 7}` , Then we will automatically merge `list`, and the integrated `data` will be `{ list: [1, 2, 3, 4, 5, 6], nextId: 7 }`.


## Basic usage

In the first example, we demonstrate the most basic infinite scroll writing.

<code src="./demo/default.tsx" />

## Scrolling to automatically load

In the infinite scrolling scene, our most common is to automatically load when scrolling to the bottom. By configuring the following properties, you can achieve rolling automatic loading.

* `options.target` specifies the parent element
* `options.isNoMore` determines if there is no more data

<code src="./demo/scroll.tsx" />

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

With `mutate`, we can directly modify the current `data`. The following example demonstrates deleting a piece of data.

<code src="./demo/mutate.tsx" />

## API

```ts

export type Data = {list: any[];[key: string]: any; };
export type Service<TData extends Data> = (currentData?: TData) => Promise<TData>;

const {
  data: TData;
  loading: boolean;
  loadingMore: boolean;
  noMore: boolean;
  loadMore: () => void;
  loadMoreAsync: () => Promise<TData>;
  reload: () => void;
  reloadAsync: () => Promise<TData>;
  cancel: () => void;
  mutate: (data?: TData) => void;
} = useRequest<TData extends Data>(
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
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| data          | The data returned by the service, where the `list` attribute is the aggregated data                                                               | `TData` \| `undefind`    |
| loading       | Is the first request in progress                                                                                                                  | `boolean`                |
| loadingMore   | Is more data request in progress                                                                                                                  | `boolean`                |
| noMore        | Whether there is no more data, it will take effect after configuring `options.isNoMore`                                                           | `boolean`                |
| loadMore      | Load more data, it will automatically catch the exception, and handle it through `options.onError`                                                | `() => void`             |
| loadMoreAsync | Load more data, which is consistent with the behavior of `loadMore`, but returns Promsie, so you need to handle the exception yourself            | `() => Promise<TData>`   |
| reload        | Load the first page of data, it will automatically catch the exception, and handle it through `options.onError`                                   | `() => void`             |
| reloadAsync   | Load the first page of data, which is consistent with the behavior of `reload`, but returns Promsie, so you need to handle the exception yourself | `() => Promise<TData>`   |
| mutate        | Modify `data` directly                                                                                                                            | `(data?: TData) => void` |
| cancel        | Cancel the request currently in progress                                                                                                          | `() => void`             |