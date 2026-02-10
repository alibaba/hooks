---
nav:
  path: /hooks
---

# useIndexDBState

A Hook that stores state into IndexedDB.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Complex object

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

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| key | The key of the IndexedDB record | `string` | - |
| options | Optional configuration | `Options` | - |

### Options

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| defaultValue | Default value | `T \| (() => T)` | `undefined` |
| dbName | Name of the IndexedDB database | `string` | `ahooks-indexdb` |
| storeName | Name of the object store | `string` | `ahooks-store` |
| version | Version of the database | `number` | `1` |
| onError | Error handler | `(error: unknown) => void` | `(e) => console.error(e)` |

### Result

| Property | Description | Type |
|----------|-------------|------|
| state | Current state | `T` |
| setState | Set state | `(value?: SetState<T>) => void` | 