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

Call precisely by specifying the event name。

```js
event$.useSubscription(val => {
  console.log(val);
},'console');
event$.emit('hello','console')
```

Call the asynchronous method and get the result。

```js
event$.useSubscription(async (val) => {
return `async ${val}`
},'console');
const res = await event$.asyncEmit('hello','console')
console.log(res[0]);
```

Support for incoming dependencies from subscription methods (keep the state value inside the subscription method up to date)

```js
const [status,setStatus] = useState('');
event$.useSubscription((val) => {
  console.log("new status:",status)
},'console',[status]);
const res = event$.emit('hello','console')
```

## Examples

### Parent component shares a event

<code src="./demo/demo1.tsx" />

### Asynchronous events shared by different components (synchronously executed)

<code src="./demo/demo2.tsx" />

## API

### Params

```typescript
const result: Result = useEventEmitter<T>();
```

### Result

| Property        | Description                   | Type                                   |
| --------------- | ----------------------------- | -------------------------------------- |
| emit            | Emit a new event.             | `(val: T) => []:any`                   |
| asyncEmit       | Send an asynchronous event    | `(val: T, name?: string) => []:any`    |
| useSubscription | Subscribe to a event emitter. | `(callback: (val: T) => void) => void` |
