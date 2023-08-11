---
nav:
  path: /hooks
---

# useMemoizedFn

Hooks for persistent functions. In general, useMemoizedFn can be used instead of useCallback. See [FAQ](#faq) for special cases.

In some scenarios, we need to use useCallback to cache a function, but when the second parameter deps changes, the function will be regenerated, causing the function reference to change.

```js
const [state, setState] = useState('');

// When the state changes, the func reference will change
const func = useCallback(() => {
  console.log(state);
}, [state]);
```

Using useMemoizedFn, you can omit the second parameter deps, and ensure that the function reference never change.

```js
const [state, setState] = useState('');

// func reference never change
const func = useMemoizedFn(() => {
  console.log(state);
});
```

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Performance Improvement

<code src="./demo/demo2.tsx" />

## API

```typescript
const memoizedFn = useMemoizedFn<T>(fn: T): T;
```

### Result

| Property   | Description                                       | Type                      |
| ---------- | ------------------------------------------------- | ------------------------- |
| memoizedFn | Function that the reference address never changes | `(...args: any[]) => any` |

### Params

| Property | Description                       | Type                      | Default |
| -------- | --------------------------------- | ------------------------- | ------- |
| fn       | Function that require persistence | `(...args: any[]) => any` | -       |

## FAQ

### The function returned by `useMemoizedFn` will not inherit properties from fn itself?

The function returned by `useMemoizedFn` is entirely different from the reference of the passed `fn`, and it does not inherit any properties from `fn` itself. If you want to preserve the properties of the function itself after memoization, `useMemoizedFn` currently does not fulfill that requirement. In this case, consider downgrading to using `useCallback` or `useMemo` instead.

Related issues: [2273](https://github.com/alibaba/hooks/issues/2273)
