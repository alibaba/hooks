---
nav:
  path: /hooks
---

# useModal

Easily use modal/drawer and other modal components in React:

- No need to manage internal state.
- Not tied to UI components.
- Internally uses Context to maintain context and does not lose global configuration.

## Code Example

### Basic Usage

<code src="./demo/demo.tsx" />

You need to wrap it with `ModalProvider` before using `useModal`.

```ts
import { ModalProvider } from "ahooks";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>
);
```

## API

```ts
import { useModal } from 'ahooks';
import type { ModalProps , ModalResult } from 'ahooks';

const Result:ModalResult = useModal<T,K>((Props:ModalProps<T,K>)=>{},props)
```

## Parameters

### Props

| Property | Description                            | Type                                   | Default     |
| -------- | -------------------------------------- | -------------------------------------- | ----------- |
| visible  | Whether to show                        | `boolean`                              | `false`     |
| hide     | Hide                                   | `() => void`                           | -           |
| destroy  | Destroy                                | `() => void`                           | -           |
| data     | Data passed in when Modal is opened    | `T \| Record<string,any> \| undefined` | -           |
| props    | Props passed in when registering Modal | `K`                                    | `undefined` |

> Note: The difference between 'hide' and 'destroy' is that 'hide' will preserve the state of the Modal, while 'destroy' will terminate the Modal's state.
> For Modals with closing animations, it's advisable to use 'hide' first and then 'destroy' once the animation has completed. **Using 'destroy' directly can result in the animation not completing properly.**

> The difference between data and props is that data is passed in each time Modal is opened, and props is passed in when Modal is registered, and props will not change.

### Result

| Property | Description | Type                                       | Default |
| -------- | ----------- | ------------------------------------------ | ------- |
| show     | Show        | `(data?: T \| Record<string,any>) => void` | -       |
| hide     | Hide        | `() => void`                               | -       |
| destroy  | Destroy     | `() => void`                               | -       |
