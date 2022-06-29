## DOM 类 Hooks 使用规范

ahooks 大部分 DOM 类 Hooks 都会接收 `target` 参数，表示要处理的元素。

`target` 支持三种类型 `React.MutableRefObject`、`HTMLElement`、`() => HTMLElement`。

1. 支持 `React.MutableRefObject`

```ts
export default () => {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>;
};
```

2. 支持 `HTMLElement`

```ts
export default () => {
  const isHovering = useHover(document.getElementById('test'));
  return <div id="test">{isHovering ? 'hover' : 'leaveHover'}</div>;
};
```

3. 支持 `() => HTMLElement`，一般适用在 SSR 场景

```ts
export default () => {
  const isHovering = useHover(() => document.getElementById('test'));
  return <div id="test">{isHovering ? 'hover' : 'leaveHover'}</div>;
};
```

另外，**DOM 类 Hooks 的 `target` 是支持动态变化的**。比如：

```ts
export default () => {
  const [boolean, { toggle }] = useBoolean();

  const ref = useRef(null);
  const ref2 = useRef(null);

  const isHovering = useHover(boolean ? ref : ref2);
  return (
    <>
      <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>
      <div ref={ref2}>{isHovering ? 'hover' : 'leaveHover'}</div>
    </>
  );
};
```
