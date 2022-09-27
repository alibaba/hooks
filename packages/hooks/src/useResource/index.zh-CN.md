---
nav:
  path: /hooks
---

# useResource

利用 Suspense 的挂起能力做数据请求

## 代码演示

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

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
createResource<R = any, E = any, P extends any[] = any[]>(fetcher: Promise<P, R>) => Resource<R, E, P>

useResource<R = any, E = any, P extends any[] = any[]>(resource: Resource<R, E, P>, ...args: P) => R;
```

### 参数

createResource

| 参数    | 说明       | 类型          | 默认值              |
| ------- | ---------- | ------------- | ------------------- | --- |
| fetcher | 数据请求器 | `Promise<any> | () => Promise<any>` | -   |

useResource

| 参数     | 说明                                   | 类型       | 默认值 |
| -------- | -------------------------------------- | ---------- | ------ |
| resource | 通过 createSource 创建的 resource 对象 | `Resource` | -      |
