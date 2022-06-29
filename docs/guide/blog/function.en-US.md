# ahooks function specification

ahooks tries its best to help everyone avoid the closure problem by specially processing the input and output functions.

**1. All the output functions of ahooks, the references are stable**

```ts
const [state, setState] = useState();
```

As we all know, the reference of the `setState` function returned by `React.useState` is fixed, and there is no need to consider weird problems when using it, and there is no need to put `setState` in the dependencies of other Hooks.

All functions returned by ahooks Hooks have the same characteristics as `setState`, the reference will not change, just feel free to use it.

**2. For all user input functions, always use the latest one**

For the received function, ahooks will do a special process to ensure that the function called each time is always the latest.

```ts
const [state, setState] = useState();

useInterval(() => {
  console.log(state);
}, 1000);
```

For example, in the above example, the function called by `useInterval` at any time is always the latest, that is, the state is always the latest.

## Principle

For the input function, we use `useRef` to make a record to ensure that the latest function can be accessed anywhere.

```js
const fnRef = useRef(fn);
fnRef.current = fn;
```

For example, the useUnmount code is as follows:

```js
const useUnmount = (fn) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};
```

In the above code, because we use ref for memorizing the latest function to solve the closure problem.

For the output function, we use the [useMemoizedFn](/zh-CN/hooks/use-memoized-fn) wrapped to ensure that the reference address will never change.

For a simple example, given a `useToggle` Hook, the code is like this:

```js
const useToggle = (left, right) => {
  const [state, setState] = useState(left);

  const toggle = useCallback(() => {
    setState((s) => (s === left ? right : left));
  }, [left, right]);

  return [state, toggle];
};
```

The `toggle` function returned in this demo will change according to the changes of `left/right`, which is uncomfortable for users to use.

Then we replace `useCallback` with `useMemoizedFn` to realize that the `toggle` reference will never change.

```js
const useToggle = (left, right) => {
  const [state, setState] = useState(left);

  const toggle = useMemoizedFn(() => {
    setState((s) => (s === left ? right : left));
  });

  return [state, toggle];
};
```
