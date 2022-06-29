---
nav:
  path: /hooks
group:
  path: /use-request
---

# 屏幕聚焦重新请求

通过设置 `options.refreshOnWindowFocus`，在浏览器窗口 `refocus` 和 `revisible` 时，会重新发起请求。

```tsx | pure
const { data } = useRequest(getUsername, {
  refreshOnWindowFocus: true,
});
```

你可以点击浏览器外部，再点击当前页面来体验效果（或者隐藏当前页面，重新展示），如果和上一次请求间隔大于 5000ms，则会重新请求一次。

<code src="./demo/refreshOnWindowFocus.tsx" />

## API

### Options

| 参数                 | 说明                                         | 类型      | 默认值  |
| -------------------- | -------------------------------------------- | --------- | ------- |
| refreshOnWindowFocus | 在屏幕重新获取焦点或重新显示时，重新发起请求 | `boolean` | `false` |
| focusTimespan        | 重新请求间隔，单位为毫秒                     | `number`  | `5000`  |

## 备注

- `options.refreshOnWindowFocus`、`options.focusTimespan` 支持动态变化。
- 监听的浏览器事件为 `visibilitychange` 和 `focus`。
