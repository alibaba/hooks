# useIndexDBState

A React Hook that stores state into IndexedDB.

## Examples

### Basic usage

```jsx
import React from 'react';
import { useIndexDBState } from 'ahooks';

export default function Demo() {
  const [message, setMessage] = useIndexDBState('message', {
    defaultValue: 'Hello',
  });

  return (
    <>
      <input
        value={message || ''}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => setMessage(undefined)}>Reset</button>
    </>
  );
}
```

### Store complex object

```jsx
import React from 'react';
import { useIndexDBState } from 'ahooks';

export default function Demo() {
  const [user, setUser] = useIndexDBState('user', {
    defaultValue: { name: 'Ahooks', age: 1 },
  });

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={() => setUser({ name: 'New Name', age: 2 })}
      >
        Update User
      </button>
    </>
  );
}
```

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