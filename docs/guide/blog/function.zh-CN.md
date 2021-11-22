# ahooks 输入输出函数处理规范

在 ahooks 内部，我们对用户输入的函数，和返回的函数做了特殊处理，尽量避免闭包问题的产生。

## 输入函数

针对用户输入的函数，需要持久化后再用，避免闭包问题。

```js
const fnRef = useRef(fn);
fnRef.current = fn;
```

比如 useUnmount 代码如下：

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

在上面的代码中，由于我们通过 ref 来记忆最新的函数，解决闭包问题。

然后我们把这两行代码封装一下，封装成 `useLatest`:

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

**所有用户输入的函数，都需要用 useLatest 包裹一下再使用。**

## 输出函数

任何输出给用户的函数，都需要用 `useMemoizedFn` 包裹一下，保证地址永远不会变化。

举一个比较简单的例子，假如我们有一个 `useToggle` Hook，代码是这样的

```js
const useToggle = (left, right) => {
  const [state, setState] = useState(left);

  const toggle = useCallback(() => {
    setState((s) => (s === left ? right : left));
  }, [left, right]);

  return [state, toggle];
};
```

这个 demo 中返回的 `toggle` 函数，会根据 `left/right` 的变化而变化的，用户用起来很难受。

众所周知，`React.useState` 返回的 `setState` 地址就是不会变化的。我们的目标是：所有返回的函数，地址都不变化。

```js
const useToggle = (left, right) => {
  const [state, setState] = useState(left);

  const toggle = useMemoizedFn(() => {
    setState((s) => (s === left ? right : left));
  });

  return [state, toggle];
};
```

通过 ahooks 的 [useMemoizedFn](/zh-CN/hooks/use-memoized-fn) 包裹，我们可以实现函数地址不变化。
