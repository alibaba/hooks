## Hooks of DOM specification

Most of the DOM Hooks will receive the `target` parameter, which indicates the element to be processed.

`target` supports three types `React.MutableRefObject`, `HTMLElement`, `() => HTMLElement`.

1. Support `React.MutableRefObject`

```ts
export default () => {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>;
};
```

2. Support `HTMLElement`

```ts
export default () => {
  const isHovering = useHover(document.getElementById('test'));
  return <div id="test">{isHovering ? 'hover' : 'leaveHover'}</div>;
};
```

3. Support `() => HTMLElement`, generally applicable in SSR scenarios

```ts
export default () => {
  const isHovering = useHover(() => document.getElementById('test'));
  return <div id="test">{isHovering ? 'hover' : 'leaveHover'}</div>;
};
```

In addition, **the `target` of DOM Hooks supports dynamic changes**. for example:

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
