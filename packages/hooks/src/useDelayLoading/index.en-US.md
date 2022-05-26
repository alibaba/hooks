---
nav:
  path: /hooks
---

# useDelayLoading

a 'hook' that delays changing the 'loading' state. It is suitable for loading 'in asynchronous operations.

The internal delay value will be set to 'true' before the request data.

If it is set to 'false' within the delay time, the logic of setting 'true' will be cancelled.

If you don't want to delay changing the state at one time, you can pass the second parameter during 'setloading'. Passing 'true' will change the state immediately.

`The main functions of usedelayloading ':

1. When the page data request speed is fast, the page flicker caused by the short occurrence of 'loading' can be avoided.

2. When the page data request speed is fast, it can effectively reduce the number of component rendering and improve the performance.

## Examples

<code src="./demo/demo1.tsx" />

## API

```typescript
const [ loading, setLoading ] = useDelayLoading(initValue: boolean, delay?: number);
```

### Params

| 参数      | 说明                                                | 类型               |
| --------- | --------------------------------------------------- | ------------------ |
| initValue | loading initial value                                       | boolean            |
| delay     | set loading to true and the delay time supports dynamic changes. The default is 200ms | undefined \| number |

