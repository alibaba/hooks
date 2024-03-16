---
nav:
  path: /hooks
---

# usePromiseQueue

Allows you to manage a series of asynchronous operations (usually Promises) in the form of a queue, with the ability to control the number of asynchronous operations executed simultaneously.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Initialize request queue and maximum number of concurrencies

<code src="./demo/demo2.tsx" />

### API

```ts
type PromiseFunction<T = any> = () => Promise<T>;

type QueueItem<T> = PromiseFunction<T>;

interface UsePromiseQueueOptions<T> {
  initQueue?: QueueItem<T>[];
  maxConcurrent?: number;
}

type ResultItem<T> = {
  success: boolean;
  value: T;
  reason: any;
  index: number;
};

type promiseFunctionArgsType = PromiseFunction<T> | PromiseFunction<T>[]
```

### Params

| Property      | Description                                       | Type             | Default |
| ------------- | ------------------------------------------------- | ---------------- | ------- | ---- |
| initQueue     | Optional, initialize the request queue            | `QueueItem<T>[]` | -       | `[]` |
| maxConcurrent | Optional, the maximum number of concurrent queues | `number`         | 1       |

### Result

| Property     | Description                                | Type                                                     |
| ------------ | ------------------------------------------ | -------------------------------------------------------- |
| isProcessing | Is requesting                              | `boolean`                                                |
| results      | result array                               | `ResultItem<T>[]`                                        |
| addToQueue   | Manually add requests to the request queue | `(promiseFunctionArgs: promiseFunctionArgsType) => void` |
