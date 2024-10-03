---
nav:
  path: /hooks
---

# usePageCacheState

usePageCacheState 是一个处理页面级缓存的解决方案。它记录当前页面的完整状态到缓存中，通常涉及缓存大量数据。您可以使用 localStorage 或 sessionStorage 来存储缓存的数据。

## 代码演示

### 将状态存入 sessionStorage

<code src="./demo/demo1.tsx" />

### 存储临时数据

<code src="./demo/demo2.tsx" />

### 存储不同用户的数据

<code src="./demo/demo3.tsx" />

## API

`useStorageStateOptions` 与 `useLocalStorageState` 和 `useSessionStorageState` 的属性相同，您可以将这些属性传递给 `useStorageStateOptions` 以获得相同的性能。

```typescript
export type StorageType = 'localStorage' | 'sessionStorage';
export type ExpireTimeProp = 'createTime' | 'updateTime';

/** 单条记录的存储的数据类型 */
type UnitStorageState<T> = {
  subKey: Exclude<Options<T>['subKey'], undefined>;
  createTime: string;
  createTimeFormat: string;
  updateTime: string;
  updateTimeFormat: string;
  /** 用户数据 */
  data?: T;
};

export type SetUnitDataState<S> = S | ((prevState?: S) => S);

interface Options<T> {
  /** 缓存类型 */
  storageType?: StorageType;
  /** 二级key。用于区分同个页面，不同用户的缓存 */
  subKey?: string;
  /** 过期时间 单位秒 s */
  expire?: number;
  /** 用于计算过期时间取值属性 */
  expireTimeProp?: ExpireTimeProp;
  /** 最大数量 */
  maxCount?: number;
  /** 缓存版本号 */
  version?: number | string;
  timeFormat?: string;
  useStorageStateOptions?: UseStorageStateOption<T>;
}

type StorageStateRecorder<T> = Record<string, Record<string, UnitStorageState<T>>>;


const [state, setState] = usePageCacheState<T>(key: string, options?: Options<T>): [T | undefined, (value?: SetState<T> | undefined) => void, {
  delete: (this: any, deleteSubKey: any) => void;
  storageStateRecorder: StorageStateRecorder<...> | undefined;
  /** 获取数据在缓存中的真实缓存key  */
  getRealityStorageKey: (storageKey: string, storageVersion?: string | number, storageSubkey?: string | number) => string
}];
```

### Result

| 参数          | 说明                 | 类型                                                                                                                                                                                                                                                                                                                   |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| state         | 存储的值             | `T`                                                                                                                                                                                                                                                                                                                    |
| setState      | 更新存储的值         | `(value?: SetState<T>) => void`                                                                                                                                                                                                                                                                                        |
| operateStates | 操作所有存储值的记录 | `{ delete: (this: any, deleteSubKey: any) => void; storageStateRecorder: StorageStateRecorder<...> \| undefined; setStorageStateRecorder: (value?: SetState<...> \| undefined) => void; };  getRealityStorageKey: (storageKey: string, storageVersion?: string \| number, storageSubkey?: string \| number) => string` |

### Options

| 参数                   | 说明                                                             | 类型                                 | 默认值                         |
| ---------------------- | ---------------------------------------------------------------- | ------------------------------------ | ------------------------------ |
| storageType            | 存储数据值的类型                                                 | `'localStorage' \| 'sessionStorage'` | `'localStorage'`               |
| subKey                 | 二级键。用于区分同个页面不同用户的缓存                           | `string`                             | `default`                      |
| expire                 | 过期时间（秒）                                                   | `number`                             | `60 * 60 * 24 * 180`(半年)     |
| expireTimeProp         | 用于计算过期时间的属性                                           | `string`                             | `'createTime' \| 'updateTime'` |
| maxCount               | 最大存储项目数                                                   | `number`                             | `100`                          |
| version                | 缓存版本号                                                       | `number \| string`                   | `'default'`                    |
| timeFormat             | 时间表示格式,同`dayjs`                                           | `string`                             | `'YYYY-MM-DD HH:mm:ss'`        |
| useStorageStateOptions | 与 `useLocalStorageState` 和 `useSessionStorageState` 的属性相同 | `UseStorageStateOption<T>`           | -                              |
