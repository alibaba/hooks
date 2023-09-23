---
nav:
  path: /hooks
---

# usePublisherState

Hooks for managing state using a publish-subscribe method, combined with `useSubscriberState`. Updating the state will only trigger re-rendering of components that actively subscribe to it through `useSubscriberState`.

## Example

### Default usage

<code src="./demo/demo1.tsx" />

## API

### usePublisherState

```typescript
type PublisherStateType<T> = {
  current: T;
  observable: Observable<string>;
};
type SetPublisherStateType<T> = (newVal: T | ((newVal: T) => T), needUpdate?: boolean) => void;

const [state, setState] = usePublisherState<T>(
  initialState: T,
): [PublisherStateType, SetPublisherStateType]
```

Hooks for defining and managing state using the publish-subscribe method. It returns a tuple containing the current state object and a function to update the state.

- `initialState: T`: The initial value of the state.

### useSubscriberState

```typescript
const state = useSubscriberState<T>(
  state: PublisherStateType<T>,
): T
```

Hooks for subscribing to state updates using the publish-subscribe method. It returns the current value of the state.

- `state: PublisherStateType<T>`: The state object returned by `usePublisherState`.

Translate this documentation into English.
