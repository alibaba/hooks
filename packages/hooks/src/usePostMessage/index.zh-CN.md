---
nav:
  path: /hooks
---

# usePostMessage

帮助开发者排查是那个属性改变导致了组件的 rerender。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript

usePostMessage({
  sign:'my-sign'
}): void;
```

### Params

| 参数     | 说明                                            | 类型     | 默认值 |
| -------- | ----------------------------------------------- | -------- | ------ |
| sign     | 选填，自定义 postmessage 信道                   | `string` | ahooks |
| iframeId | 选填，子 iframe 的 id。如果是父传子消息，必填。 | `string` | -      |

### Result

可以在组件中监听 message，获取到组件跨 iframe 传递的信息。

```js

useEffect(() => {
 console.log('这是对方传来的消息',message);
}, [message]);
```
