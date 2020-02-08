---
title: useEventListener
group:
  title: Dom
  path: /dom
  order: 500
---

# useEventListener

Use EventListener elegant by Hook.

## Examples

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```javascript
function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { capture?: boolean; once?: boolean; passive?: boolean; },
): MutableRefObject<T>;

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { dom: Dom, capture?: boolean; once?: boolean; passive?: boolean; },
): void

type Target = HTMLElement | Window;
type Options = { dom?: Dom; capture?: boolean; once?: boolean; passive?: boolean; }
type Dom = Target | (() => Target) | null;

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
| dom | Optional, if none is passed, this hook will subscribe to the ref that it returns.	 | HTMLElement \| (() => HTMLElement) \| null   | Window      |
| capture | Optional, a Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.	 | boolean  |    -   |
| once | Optional, A Boolean indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.	 | boolean   |    -   |
| passive | Optional, A Boolean which, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning.	 | boolean   |    -   |

### Return

| Property | Description                                                       | Type                 |
|------|----------|------|
| ref | When no param is passed, this ref will be listened. | `RefObject<HTMLElement>` |
