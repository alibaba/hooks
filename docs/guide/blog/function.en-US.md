# ahooks function specification

Inside ahooks, we have made special treatment for the functions input by the user and the functions returned, to avoid the closure problem as much as possible.

## Input function

The function input by the user needs to be memorized before being used to avoid the closure problem.

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

Then we encapsulate these two lines of code into `useLatest`:

```js
const useUnmount = (fn) => {
  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
```

**All functions input by the user need to be wrapped with useLatest before being used.**

## Output function

Any function output to the user needs to be wrapped with `useMemoizedFn` to ensure that the reference address will never change.

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

As we all know, the `setState` reference address returned by `React.useState` will not change. Our goal is: the reference addresses of all returned functions remain unchanged.

```js
const useToggle = (left, right) => {
  const [state, setState] = useState(left);

  const toggle = useMemoizedFn(() => {
    setState((s) => (s === left ? right : left));
  });

  return [state, toggle];
};
```

By using the [useMemoizedFn](/hooks/use-memoized-fn), we can ensure that the function reference address will not change.
