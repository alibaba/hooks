---
nav:
  path: /hooks
---

# useLocalStorageState

将状态存储在 localStorage 中的 Hook 。

## 代码演示

### 将 state 存储在 localStorage 中

<code src="./demo/demo1.tsx" />

### 存储复杂类型数据

<code src="./demo/demo2.tsx" />

### 自定义序列化和反序列化函数

<code src="./demo/demo3.tsx" />

### 将 state 与 localStorage 保持同步

<code src="./demo/demo4.tsx" />

## API

如果想从 localStorage 中删除这条数据，可以使用 `setState()` 或 `setState(undefined)` 。

```typescript
type SetState<S> = S | ((prevState?: S) => S);

interface Options<T> {
  defaultValue?: T | (() => T);
  listenStorageChange?: boolean;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: unknown) => void;
}

const [state, setState] = useLocalStorageState<T>(
  key: string,
  options: Options<T>
): [T?, (value?: SetState<T>) => void];
```

### Result

| 参数     | 说明                   | 类型                            |
| -------- | ---------------------- | ------------------------------- |
| state    | 本地 `localStorage` 值 | `T`                             |
| setState | 设置 `localStorage` 值 | `(value?: SetState<T>) => void` |

### Options

| 参数                | 说明                                                                                                                              | 类型                       | 默认值                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------------------------- |
| defaultValue        | 默认值                                                                                                                            | `any \| (() => any)`       | -                             |
| listenStorageChange | 是否监听存储变化。如果是 `true`，当存储值变化时，所有 `key` 相同的 `useLocalStorageState` 会同步状态，包括同一浏览器不同 tab 之间 | `boolean`                  | `false`                       |
| serializer          | 自定义序列化方法                                                                                                                  | `(value: any) => string`   | `JSON.stringify`              |
| deserializer        | 自定义反序列化方法                                                                                                                | `(value: string) => any`   | `JSON.parse`                  |
| onError             | 错误回调函数                                                                                                                      | `(error: unknown) => void` | `(e) => { console.error(e) }` |

## 备注

useLocalStorageState 在往 localStorage 写入数据前，会先调用一次 `serializer`，在读取数据之后，会先调用一次 `deserializer`。
