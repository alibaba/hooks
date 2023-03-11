---
nav:
  path: /hooks
---

# useEventEmitter

Sometimes it is difficult to pass events between multiple components. By using EventEmitter, this can be simplified.

To get an instance of `EventEmitter`, you can call `useEventEmitter` in React components.

```js
const event$ = useEventEmitter();
```

> If the component renders multiple times, the return value of `useEventEmitter` in every render process will stay unchanged and no extra `EventEmitter` instance will be created.

Then we can share `event$` to other components via `props` or `Context`. To push a event, just call the `emit` method of `EventEmitter`. To subscribe to a series of events, call the `useSubscription` method.

```js
event$.emit('hello');
```

```js
event$.useSubscription(val => {
  console.log(val);
});
```

> `useSubscription` will automatically register the subscription and unsubscription.

If you want to let the child component notify the parent component, you can just use `props` to pass a `onEvent` function. And if you want to let the parent component notify the child component, you can use `forwardRef` to retrieve the ref of child component. `useEventEmitter` is most suitable for event management among multiple components or between two components which are far away.

## Examples

### Parent component shares a event

<code src="./demo/demo1.tsx" />

## API

### Params

```typescript
const result: Result = useEventEmitter<T>();
```

### Result

| Property        | Description                   | Type                                   |
| --------------- | ----------------------------- | -------------------------------------- |
| emit            | Emit a new event.             | `(val: T) => void`                     |
| useSubscription | Subscribe to a event emitter. | `(callback: (val: T) => void) => void` |
