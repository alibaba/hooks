# ahooks function specification

Inside ahooks, we have made special treatment for the functions input by the user and the functions returned, to avoid the closure problem as much as possible.

## Input function

The function input by the user needs to be persisted before being used to avoid the closure problem.

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

In the above code, because we use ref to memorize the latest function, can solve the closure problem.

Then we encapsulate these two lines of code into useLatest

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

Any function output to the user needs to be wrapped with useMemoizedFn to ensure that the reference address will never change.

To give a relatively simple example, if we have a useToggle, the code is like this

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

As we all know, the `setState` reference address returned by `React.useState` will not change. Our goal is: the reference address of all returned functions remains unchanged.

```js
const useToggle = (left, right) => {
  const [state, setState] = useState(left);
  const toggle = () => {
    setState((s) => (s === left ? right : left));
  };

  return [state, useMemoizedFn(toggle)];
};
```

Through the [useMemoizedFn](/zh-CN/hooks/use-memoized-fn), we can realize that the function reference address does not change.
