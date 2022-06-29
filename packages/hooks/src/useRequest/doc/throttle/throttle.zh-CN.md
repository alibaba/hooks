---
nav:
  path: /hooks
group:
  path: /use-request
---

# 节流

通过设置 `options.throttleWait`，进入节流模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以节流策略进行请求。

```tsx | pure
const { data, run } = useRequest(getUsername, {
  throttleWait: 300,
  manual: true
});
```

如上示例代码，频繁触发 `run`，只会每隔 300ms 执行一次。

你可以在下面 input 框中快速输入文本，体验效果

<code src="./demo/throttle.tsx" />

## API

### Options

throttle 所有参数用法和效果同 [lodash.throttle](https://www.lodashjs.com/docs/lodash.throttle/)

| 参数             | 说明                                           | 类型      | 默认值 |
| ---------------- | ---------------------------------------------- | --------- | ------ |
| throttleWait     | 节流等待时间, 单位为毫秒，设置后，进入节流模式 | `number`  | -      |
| throttleLeading  | 在节流开始前执行调用                           | `boolean` | `true` |
| throttleTrailing | 在节流结束后执行调用                           | `boolean` | `true` |

## 备注

- `options.throttleWait`、`options.throttleLeading`、`options.throttleTrailing` 支持动态变化。
- `runAsync` 在真正执行时，会返回 `Promise`。在未被执行时，不会有任何返回。
- `cancel` 可以中止正在等待执行的函数。
