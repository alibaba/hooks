---
nav:
  path: /hooks
group:
  path: /use-request
---

# 依赖刷新

通过设置 `options.refreshDeps`，在初始化和依赖变化时， `useRequest` 会自动调用 [refresh](https://ahooks.js.org/zh-CN/hooks/use-request/basic/#result) 方法，实现[刷新（重复上一次请求）](https://ahooks.js.org/zh-CN/hooks/use-request/basic/#刷新重复上一次请求)的效果。

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

### 刷新上一次请求

<code src="./demo/refreshDeps.tsx" />

### 自定义刷新行为

<code src="./demo/refreshDepsAction.tsx" />

## API

### Options

| 参数              | 说明                                                                | 类型         | 默认值 |
| ----------------- | ------------------------------------------------------------------- | ------------ | ------ |
| refreshDeps       | 依赖数组，当数组内容变化后，发起请求。同 `useEffect` 的第二个参数。 | `any[]`      | `[]`   |
| refreshDepsAction | 自定义依赖刷新时的请求行为，该参数会在初始化和依赖变化后被调用。    | `() => void` | -      |
