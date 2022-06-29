---
nav:
  path: /hooks
group:
  path: /use-request
---

# RefreshDeps

useRequest provides an `options.refreshDeps`, which will trigger the request refresh when its value changes.

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

You can experience the effect through the following example

<code src="./demo/refreshDeps.tsx" />

## API

### Options

| Property    | Description                                             | Type                   | Default |
| ----------- | ------------------------------------------------------- | ---------------------- | ------- |
| refreshDeps | When the content of the array changes, trigger refresh. | `React.DependencyList` | `[]`    |
