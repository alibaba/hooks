---
nav:
  path: /hooks
group:
  path: /use-request
---

# 依赖刷新

useRequest 提供了一个 `options.refreshDeps` 参数，当它的值变化后，会重新触发请求。

```tsx | pure
const [userId, setUserId] = useState('1');

const { data, run } = useRequest(() => getUserSchool(userId), {
  refreshDeps: [userId],
});
```

上面的示例代码，`useRequest` 会在初始化和 `userId` 变化时，触发函数执行。

与下面代码实现功能完全一致

```tsx | pure
const [userId, setUserId] = useState('1');

const { data, refresh } = useRequest(() => getUserSchool(userId));

useEffect(() => {
  refresh();
}, [userId]);
```

你可以通过下面示例来体验效果

<code src="./demo/refreshDeps.tsx" />

## API

### Options

| 参数        | 说明                                                                | 类型    | 默认值 |
| ----------- | ------------------------------------------------------------------- | ------- | ------ |
| refreshDeps | 依赖数组，当数组内容变化后，发起请求。同 `useEffect` 的第二个参数。 | `any[]` | `[]`   |
