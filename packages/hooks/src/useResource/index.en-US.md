---
nav:
  path: /hooks
---

# useResource

Utilize Suspense's suspend ability to make data requests

## Examples

```typescript
import React, { Suspense } from 'react';
import { createResource, useResource } from 'ahooks';

const resource = createResource((text: string) => new Promise<string>((resolve) => setTimeout(() => {
  resolve(text);
}, 500)));

const Child = () => {
  const txt = useResource(resource, 'Hello World');

  return <div>{txt}</div>;
};

export default () => {
  return (
    <>
      <h3>useResource</h3>
      <Suspense fallback={<span>loading...</span>}>
        <Child />
      </Suspense>
    </>
  );
};
```

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
createResource<R = any, E = any, P extends any[] = any[]>(fetcher: Promise<P, R>) => Resource<R, E, P>

useResource<R = any, E = any, P extends any[] = any[]>(resource: Resource<R, E, P>, ...args: P) => R;
```

### Params

createResource

| 参数    | 说明         | 类型          | 默认值              |
| ------- | ------------ | ------------- | ------------------- | --- |
| fetcher | data fetcher | `Promise<any> | () => Promise<any>` | -   |

useResource

| 参数     | 说明                                        | 类型       | 默认值 |
| -------- | ------------------------------------------- | ---------- | ------ |
| resource | The resource object created by createSource | `Resource` | -      |
