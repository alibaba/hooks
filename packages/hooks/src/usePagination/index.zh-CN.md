---
nav:
  path: /hooks
---

# usePagination

`usePagination` 基于 `useRequest` 实现，封装了常见的分页逻辑。与 `useRequest` 不同的点有以下几点：

1. `service` 的第一个参数为 `{ current: number, pageSize: number }`
2. `service` 返回的数据结构为 `{ total: number, list: Item[] }`
3. 会额外返回 `pagination` 字段，包含所有分页信息，及操作分页的函数。
4. `refreshDeps` 变化，会重置 `current` 到第一页，并重新发起请求，一般你可以把 `pagination` 依赖的条件放这里

## 代码演示

### 基础用法

默认用法与 `useRequest` 一致，但会多返回一个 `pagination` 参数，包含所有分页信息，及操作分页的函数。

<code src="./demo/demo1.tsx" />

### 更多参数

下面的代码演示了，增加了性别参数，在修改性别时，重置分页到第一页，并重新请求数据。

<code src="./demo/demo2.tsx" />

### refreshDeps

`refreshDeps` 是一个语法糖，当它变化时，会重置分页到第一页，并重新请求数据，一般你可以把依赖的条件放这里。以下示例通过 `refreshDeps` 更方便的实现了上一个功能。

<code src="./demo/demo3.tsx" />

### 缓存

通过 `useRequest` 的 `params` 缓存能力，我们可以缓存分页数据和其它条件。

<code src="./demo/demo4.tsx" />

## API

`useRequest` 所有参数和返回结果均适用于 `usePagination`，此处不再赘述。

```typescript

type Data<T> = { total: number; list: T[] };
type Params = [{ current: number; pageSize: number, [key: string]: any }, ...any[]];

const {
  ...,
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
  }
} = usePagination<TData extends Data, TParams extends Params>(
  service: (...args: TParams) => Promise<TData>,
  {
    ...,
    defaultPageSize?: number;
    refreshDeps?: any[];
  }
);
```

### Result

| 参数       | 说明                     | 类型 |
| ---------- | ------------------------ | ---- |
| pagination | 分页数据及操作分页的方法 | `-`  |

### Params

| 参数            | 说明                                                                                        | 类型                   | 默认值 |
| --------------- | ------------------------------------------------------------------------------------------- | ---------------------- | ------ |
| defaultPageSize | 默认分页数量                                                                                | `number`               | 10      |
| defaultCurrent  | 初次请求时的页数                                                                            | `number`               | 1      |
| refreshDeps     | `refreshDeps` 变化，会重置 current 到第一页，并重新发起请求，一般你可以把依赖的条件放这里。 | `React.DependencyList` | `[]`   |
