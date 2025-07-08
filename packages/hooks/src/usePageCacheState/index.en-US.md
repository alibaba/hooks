---
nav:
  path: /hooks
---

# usePageCacheState

usePageCacheState is a solution for handling page-level caching. It records the complete state of the current page in the cache, which typically involves caching a large amount of data. You can use localStorage or sessionStorage to store the cached data.

## Examples

### Store state into sessionStorage

<code src="./demo/demo1.tsx" />

### Store temporary data

<code src="./demo/demo2.tsx" />

### Store data for different users

<code src="./demo/demo3.tsx" />

## API

`useStorageStateOptions` is same as the props of `useLocalStorageState` and `useSessionStorageState`, you can just pass those props into `useStorageStateOptions` to get the same performance.

```typescript
export type StorageType = 'localStorage' | 'sessionStorage';
export type ExpireTimeProp = 'createTime' | 'updateTime';

/** Data type for storing a single record */
type UnitStorageState<T> = {
  subKey: Exclude<Options<T>['subKey'], undefined>;
  createTime: string;
  createTimeFormat: string;
  updateTime: string;
  updateTimeFormat: string;
  /** User data */
  data?: T;
};

export type SetUnitDataState<S> = S | ((prevState?: S) => S);

export interface Options<T> {
  /** Cache type */
  storageType?: StorageType;
  /** Secondary key. Used to differentiate cache between different users on the same page */
  subKey?: string;
  /** Expiration time in seconds */
  expire?: number;
  /** Property used to calculate expiration time */
  expireTimeProp?: ExpireTimeProp;
  /** Maximum count */
  maxCount?: number;
  /** Cache version number */
  version?: number | string;
  timeFormat?: string;
  useStorageStateOptions?: UseStorageStateOption<T>;
}

type StorageStateRecorder<T> = Record<string, Record<string, UnitStorageState<T>>>;


const [state, setState] = usePageCacheState<T>(key: string, options?: Options<T>): [T | undefined, (value?: SetState<T> | undefined) => void, {
  delete: (this: any, deleteSubKey: any) => void;
  storageStateRecorder: StorageStateRecorder<...> | undefined;
  setStorageStateRecorder: (value?: SetState<...> | undefined) => void;
  /** get the real key in storage by keys and version  */
  getRealityStorageKey: (storageKey: string, storageVersion?: string | number, storageSubkey?: string | number) => string
}];
```

### Result

| Property      | Description                             | Type                                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| state         | storaged value                          | `T`                                                                                                                                                                                                                                                                                                                   |
| setState      | Update storaged value                   | `(value?: SetState<T>) => void`                                                                                                                                                                                                                                                                                       |
| operateStates | operation all storaged value's recorder | `{ delete: (this: any, deleteSubKey: any) => void; storageStateRecorder: StorageStateRecorder<...> \| undefined; setStorageStateRecorder: (value?: SetState<...> \| undefined) => void; }; getRealityStorageKey: (storageKey: string, storageVersion?: string \| number, storageSubkey?: string \| number) => string` |

### Options

| Property               | Description                                                                      | Type                                 | Default                          |
| ---------------------- | -------------------------------------------------------------------------------- | ------------------------------------ | -------------------------------- |
| storageType            | type of storage data value                                                       | `'localStorage' \| 'sessionStorage'` | `'localStorage'`                 |
| subKey                 | Secondary key. Used to differentiate cache for different users on the same page. | `string`                             | `default`                        |
| expire                 | Expiration time in seconds (s)                                                   | `number`                             | `60 * 60 * 24 * 180`(six months) |
| expireTimeProp         | Property used to calculate the expiration time                                   | `'createTime' \| 'updateTime'`       | `'updateTime'`                   |
| maxCount               | Maximum number of items to store                                                 | `number`                             | `100`                            |
| version                | Cache version number                                                             | `number \| string`                   | `'default'`                      |
| timeFormat             | Time format, same as `dayjs`                                                     | `string`                             | `'YYYY-MM-DD HH:mm:ss'`          |
| useStorageStateOptions | same as the props of `useLocalStorageState` and `useSessionStorageState`         | `UseStorageStateOption<T>`           | -                                |
