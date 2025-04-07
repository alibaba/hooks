---
nav:
  path: /hooks
---

# useIndexDBState

一个可以将状态持久化存储到 IndexedDB 中的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 存储复杂对象

<code src="./demo/demo2.tsx" />

## API

```typescript
type SetState<S> = S | ((prevState?: S) => S);

interface Options<T> {
  defaultValue?: T | (() => T);
  dbName?: string;
  storeName?: string;
  version?: number;
  onError?: (error: unknown) => void;
}

const [state, setState] = useIndexDBState<T>(key: string, options?: Options<T>);
```

### Params

| 参数    | 说明                          | 类型     | 默认值 |
|---------|-------------------------------|----------|--------|
| key     | 存储在 IndexedDB 中的键名     | `string` | -      |
| options | 可选配置项                    | `Options`| -      |

### Options

| 参数         | 说明                              | 类型                      | 默认值                  |
|--------------|-----------------------------------|---------------------------|-------------------------|
| defaultValue | 默认值                            | `T \| (() => T)`          | `undefined`             |
| dbName       | IndexedDB 数据库名称              | `string`                  | `ahooks-indexdb`        |
| storeName    | 对象存储空间名称                  | `string`                  | `ahooks-store`          |
| version      | 数据库版本                        | `number`                  | `1`                     |
| onError      | 错误处理函数                      | `(error: unknown) => void`| `(e) => console.error(e)` |

### Result

| 参数     | 说明                    | 类型                           |
|----------|-------------------------|--------------------------------|
| state    | 当前状态                | `T`                            |
| setState | 设置状态的函数          | `(value?: SetState<T>) => void`| 