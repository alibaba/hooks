---
nav:
  path: /hooks
group:
  path: /use-request
---

# 防抖

通过设置 `options.debounceWait`，进入防抖模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以防抖策略进行请求。

```tsx | pure
const { data, run } = useRequest(getUsername, {
  debounceWait: 300,
  manual: true
});
```

如上示例代码，频繁触发 `run`，只会在最后一次触发结束后等待 300ms 执行。

你可以在下面 input 框中快速输入文本，体验效果

<code src="./demo/debounce.tsx" />

## API

### Options

debounce 所有参数用法和效果同 [lodash.debounce](https://www.lodashjs.com/docs/lodash.debounce/)

| 参数             | 说明                                           | 类型      | 默认值  |
| ---------------- | ---------------------------------------------- | --------- | ------- |
| debounceWait     | 防抖等待时间, 单位为毫秒，设置后，进入防抖模式 | `number`  | -       |
| debounceLeading  | 在延迟开始前执行调用                           | `boolean` | `false` |
| debounceTrailing | 在延迟结束后执行调用                           | `boolean` | `true`  |
| debounceMaxWait  | 允许被延迟的最大值                             | `number`  | -       |

## 备注

- `options.debounceWait`、`options.debounceLeading`、`options.debounceTrailing`、`options.debounceMaxWait` 支持动态变化。
- `runAsync` 在真正执行时，会返回 `Promise`。在未被执行时，不会有任何返回。
- `cancel` 可以中止正在等待执行的函数。
