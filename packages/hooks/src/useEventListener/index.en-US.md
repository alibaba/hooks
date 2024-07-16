---
nav:
  path: /hooks
---

# useEventListener

Use addEventListener elegant by Hook.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Listen for keydown

<code src="./demo/demo2.tsx" />

### Listen for multiple events

<code src="./demo/demo3.tsx" />

## API

```typescript
useEventListener(
  eventName: string,
  handler: (ev: Event) => void,
  options?: Options,
);
```

### Property

| Property  | Description            | type                   | default |
| --------- | ---------------------- | ---------------------- | ------- |
| eventName | Event name             | `string` \| `string[]` | -       |
| handler   | Callback function      | `(ev: Event) => void`  | -       |
| options   | More options(optional) | `Options`              | -       |

### Options

| Property | Description                                                                                                                                                                                                                                     | type                                                                                          | default  |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------- |
| target   | DOM element or ref                                                                                                                                                                                                                              | `(() => Element)` \| `Element` \| `React.MutableRefObject<Element>` \| `Window` \| `Document` | `window` |
| capture  | Optional, a Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.                                                                    | `boolean`                                                                                     | `false`  |
| once     | Optional, A Boolean indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.                                                                           | `boolean`                                                                                     | `false`  |
| passive  | Optional, A Boolean which, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning. | `boolean`                                                                                     | `false`  |
| enable   | Optional, Whether to enable listening.                                                                                                                                                                                                          | `boolean`                                                                                     | `true`   |
