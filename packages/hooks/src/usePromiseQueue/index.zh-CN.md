---
nav:
  path: /hooks
---

# usePromiseQueue

允许您以队列的形式管理一系列异步操作（通常是 Promise），并且能够控制同时执行的异步操作数量。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 初始化请求队列和最大并发数

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

| 参数          | 说明                   | 类型             | 默认值 |
| ------------- | ---------------------- | ---------------- | ------ | ---- |
| initQueue     | 可选，初始化请求队列   | `QueueItem<T>[]` | -      | `[]` |
| maxConcurrent | 可选，队列的最大并发数 | `number`         | 1      |

### Result

| 参数         | 说明                   | 类型                                                     |
| ------------ | ---------------------- | -------------------------------------------------------- |
| isProcessing | 是否正在请求           | `boolean`                                                |
| results      | 结果数组               | `ResultItem<T>[]`                                        |
| addToQueue   | 手动添加请求到请求队列 | `(promiseFunctionArgs: promiseFunctionArgsType) => void` |
