---
nav:
  path: /hooks
---

# useEventEmitter

在多个组件之间进行事件通知有时会让人非常头疼，借助 EventEmitter ，可以让这一过程变得更加简单。

在组件中调用 `useEventEmitter` 可以获得一个 `EventEmitter` 的实例：

```js
const event$ = useEventEmitter();
```

> 在组件多次渲染时，每次渲染调用 `useEventEmitter` 得到的返回值会保持不变，不会重复创建 `EventEmitter` 的实例。

通过 `props` 或者 `Context` ，可以将 `event$` 共享给其他组件。然后在其他组件中，可以调用 `EventEmitter` 的 `emit` 方法，推送一个事件，或是调用 `useSubscription` 方法，订阅事件。

```js
event$.emit('hello');
```

```js
event$.useSubscription(val => {
  console.log(val);
});
```

> `useSubscription` 会在组件创建时自动注册订阅，并在组件销毁时自动取消订阅。

对于**子组件**通知**父组件**的情况，我们仍然推荐直接使用 `props` 传递一个 `onEvent` 函数。而对于**父组件**通知**子组件**的情况，可以使用 `forwardRef` 获取子组件的 ref ，再进行子组件的方法调用。 `useEventEmitter` 适合的是在**距离较远**的组件之间进行事件通知，或是在**多个**组件之间共享事件通知。

## 代码演示

### 父组件向子组件共享事件

<code src="./demo/demo1.tsx" />

## API

```typescript
const result: Result = useEventEmitter<T>();
```

### Result

| 参数            | 说明             | 类型                                   |
| --------------- | ---------------- | -------------------------------------- |
| emit            | 发送一个事件通知 | `(val: T) => void`                     |
| useSubscription | 订阅事件         | `(callback: (val: T) => void) => void` |
