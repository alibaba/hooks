---
nav:
  path: /hooks
---

# usePostMessage

Using usePostMessage to do cross-domain iframe communication.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript

usePostMessage({
  sign:'my-sign'
}): void;
```

### Params

| Property | Description                              | Type     | Default |
| -------- | ---------------------------------------- | -------- | ------- |
| sign     | optional，custom postMessage signal path | `string` | ahooks  |
| iframeId | optional，iframe id                      | `string` | -       |

### Result

Achieve the message passed by the component across iframe.

```js
useEffect(() => {
 console.log('这是对方传来的消息',message);
}, [message]);
```
