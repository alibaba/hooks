---
title: useLocalStorageState
nav: Hooks
group:
  title: State
  order: 4
order: 6
toc: content
demo:
  cols: 2
---

# useLocalStorageState

A Hook that store state into localStorage.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>

## API

If you want to delete this record from localStorage, you can use `setState()` or `setState(undefined)`.

```typescript
type SetState<S> = S | ((prevState?: S) => S);

interface Options<T> {
  defaultValue?: T | (() => T);
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

| Property     | Description                   | Type                       | Default                       |
| ------------ | ----------------------------- | -------------------------- | ----------------------------- |
| defaultValue | Default value                 | `any \| (() => any)`       | -                             |
| serializer   | Custom serialization method   | `(value: any) => string`   | `JSON.stringify`              |
| deserializer | Custom deserialization method | `(value: string) => any`   | `JSON.parse`                  |
| onError      | On error callback             | `(error: unknown) => void` | `(e) => { console.error(e) }` |

## Remark

useLocalStorageState will call `serializer` before write data to localStorage, and call `deserializer` once after read data.
