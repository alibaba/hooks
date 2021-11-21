## Intro

ahooks, pronounced [eɪ hʊks], is a high-quality and reliable React Hooks library. In the current React project development process, a set of easy-to-use React Hooks library is indispensable, hope ahooks can be your choice.

Compared with other Hooks libraries in the community, ahooks has the following advantages.

## Rich content

ahooks provides 70+ Hooks, which not only include some basic Hooks, but also provide a large number of advanced Hooks refined from business scenarios. for example:

- `useRequest`: a powerful async data management Hook, it is sufficient enough for network request scenarios in React projects.
- `useInfiniteScroll`: encapsulates the common infinite scroll logic.
- `useVirtualList`: allows you to use virtual list to render huge chunks of list data.
- ...

## Support SSR

ahooks fully supports SSR, and related documents can be found in "[React Hooks & SSR](/guide/blog/ssr)".

## Avoid closure problems

Inside ahooks, we have made special treatment for the functions input by the user and the functions returned, to avoid the closure problem as much as possible.

**The reference address of all output functions of ahooks will not change.**

```ts
const [state, setState] = React.useState();
```

As we all know, the `setState` reference address returned by `React.useState` will not change.

All functions returned in ahooks have the same characteristics as `setState`, and the reference address will not change.

```ts
const [state, { toggle }] = useToggle();
```

For example, the reference address of `toggle` function returned by `useToggle` is always stable.

**All input functions of ahooks always use the latest one.**

For the received function, ahooks will do a special process to ensure that the function called each time is always the latest.

```ts
const [state, setState] = useState();

useInterval(() => {
  console.log(state);
}, 1000);
```

For example, in the above example, the function called by `useInterval` is always the latest.

Related documents can be found in "[ahooks function specification](/guide/blog/function)".
