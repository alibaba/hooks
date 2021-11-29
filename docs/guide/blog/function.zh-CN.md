# ahooks 函数处理规范

ahooks 通过对输入输出函数做特殊处理，尽力帮助大家避免闭包问题。

**1. ahooks 所有的输出函数，地址都是不会变化的**

```ts
const [state, setState] = React.useState();
```

众所周知，`React.useState` 返回的 `setState` 函数地址是固定的，使用时不需要考虑奇奇怪怪的问题，不需要把 `setState` 放到各种依赖中。

ahooks 所有 Hooks 返回的函数，都拥有和 `setState` 一样的特性，地址不会变化，放心大胆的使用即可。

**2. 所有用户输入的函数，永远使用最新的一份**

对于接收的函数，ahooks 会做一次特殊处理，保证每次调用的函数永远是最新的。

```ts
const [state, setState] = useState();

useInterval(() => {
  console.log(state);
}, 1000);
```

比如以上示例，`useInterval` 任何时候调用的函数永远是最新的，也就是 state 永远是最新的。

## 实现原理

针对输入函数，我们通过 `useRef` 做一次记录，以保证在任何地方都能访问到最新的函数。

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

针对输出函数，我们通过 ahooks 的 [useMemoizedFn](/zh-CN/hooks/use-memoized-fn) 包裹，保证地址永远不会变化。

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

然后我们将 `useCallback` 替换成 `useMemoizedFn`，即可实现 `toggle` 地址永远不变化。

```js
const useToggle = (left, right) => {
  const [state, setState] = useState(left);

  const toggle = useMemoizedFn(() => {
    setState((s) => (s === left ? right : left));
  });

  return [state, toggle];
};
```
