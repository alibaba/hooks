---
nav:
  path: /hooks
group:
  path: /use-request
---

# RefreshDeps

By setting `options.refreshDeps`, `useRequest` will run [refresh](https://ahooks.js.org/hooks/use-request/basic/#result) automatically when initialization and dependencies changes, achieving the effect of [Refresh (repeat the last request)](https://ahooks.js.org/hooks/use-request/basic/#refresh-repeat-the-last-request).

```tsx | pure
const [userId, setUserId] = useState('1');
const { data, run } = useRequest(() => getUserSchool(userId), {
  refreshDeps: [userId],
});
```

In the example code above, `useRequest` will execution when it is initialized and `userId` changes.

It is exactly the same with the following implementation

```tsx | pure
const [userId, setUserId] = useState('1');
const { data, refresh } = useRequest(() => getUserSchool(userId));

useEffect(() => {
  refresh();
}, [userId]);
```

### Refresh last request

<code src="./demo/refreshDeps.tsx" />

### Custom refresh

<code src="./demo/refreshDepsAction.tsx" />

## API

### Options

| Property          | Description                                                                                                                    | Type                   | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------- |
| refreshDeps       | When the content of the array changes, trigger refresh.                                                                        | `React.DependencyList` | `[]`    |
| refreshDepsAction | Customize the request behavior for dependency refresh, this parameter is called after initialization and dependencies changes. | `() => void`           | -       |
