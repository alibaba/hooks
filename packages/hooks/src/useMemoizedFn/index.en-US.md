---
title: useMemoizedFn
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

# useMemoizedFn

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

Hooks for persistent functions. In theory, useMemoizedFn can be used instead of useCallback.

In some scenarios, we need to use useCallback to cache a function, but when the second parameter deps changes, the function will be regenerated, causing the function reference to change.

```js
const [state, setState] = useState('');

// When the state changes, the func reference will change
const func = useCallback(()=>{
  console.log(state);
}, [state]);
```

Using useMemoizedFn, you can omit the second parameter deps, and ensure that the function reference never change.

```js
const [state, setState] = useState('');

// func reference nerver change
const func = useMemoizedFn(()=>{
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
type noop = (...args: any[]) => any;

const fn = useMemoizedFn<T extends noop>(fn: T):T;
```

### Result

| Property | Description                            | Type                      |
|----------|----------------------------------------|---------------------------|
| fn       | Fn the reference address never changes | `(...args: any[]) => any` |

### Params

| Property | Description                       | Type                      | Default |
|----------|-----------------------------------|---------------------------|---------|
| fn       | Function that require persistence | `(...args: any[]) => any` | -       |
