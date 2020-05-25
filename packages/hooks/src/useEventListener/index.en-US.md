---
title: useEventListener
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-event-listener
---

# useEventListener

Use EventListener elegant by Hook.

## Examples

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```ts
function useEventListener(
  eventName: string,
  handler: Function,
  options?: { target: Target, capture?: boolean; once?: boolean; passive?: boolean; },
): void

type Target = () => HTMLElement | React.RefObject<HTMLElement>;
```

### Property

| Property    | Description     | type                   | default |
|---------|----------|------------------------|--------|
| eventName | Event name | string | -      |
| handler | Handle function | Function | -      |
| options | More options(optional) | Options |   -   |

### Options

| Property    | Description     | type                   | default |
|---------|----------|------------------------|--------|
| target | DOM element or Ref Object | () => HTMLElement \| React.RefObject | - |
| capture | Optional, a Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.	 | boolean  |    -   |
| once | Optional, A Boolean indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.	 | boolean   |    -   |
| passive | Optional, A Boolean which, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning.	 | boolean   |    -   |
