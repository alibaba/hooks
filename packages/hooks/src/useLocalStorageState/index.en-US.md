---
nav:
  path: /hooks
---

# useLocalStorageState

A Hook that store state into localStorage.

## Examples

### Store state into localStorage

<code src="./demo/demo1.tsx" />

### Store complex types of data

<code src="./demo/demo2.tsx" />

### Custom serialization and deserialization functions

<code src="./demo/demo3.tsx" />

### Sync state with localStorage

<code src="./demo/demo4.tsx" />

## API

If you want to delete this record from localStorage, you can use `setState()` or `setState(undefined)`.

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

| Property | Description                 | Type                            |
| -------- | --------------------------- | ------------------------------- |
| state    | Local `localStorage` value  | `T`                             |
| setState | Update `localStorage` value | `(value?: SetState<T>) => void` |

### Options

| Property            | Description                                                                                                                                                                                             | Type                       | Default                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------------------------- |
| defaultValue        | Default value                                                                                                                                                                                           | `any \| (() => any)`       | -                             |
| listenStorageChange | Whether to listen storage changes. If `true`, when the stored value changes, all `useLocalStorageState` with the same `key` will synchronize their states, including different tabs of the same browser | `boolean`                  | `false`                       |
| serializer          | Custom serialization method                                                                                                                                                                             | `(value: any) => string`   | `JSON.stringify`              |
| deserializer        | Custom deserialization method                                                                                                                                                                           | `(value: string) => any`   | `JSON.parse`                  |
| onError             | On error callback                                                                                                                                                                                       | `(error: unknown) => void` | `(e) => { console.error(e) }` |

## Remark

useLocalStorageState will call `serializer` before write data to localStorage, and call `deserializer` once after read data.
