---
title: useSearch
nav:
  title: Hooks
  path: /hooks
group:
  title: Deprecated
  path: /deprecated
legacy: /deprecated/use-search
---

# useSearch

<Alert>
<b>⚠️WARNING: useSearch is deprecated and will be removed in the next major version. Please use <a href="/async?anchor=debounce">useRequest debounceInterval</a> instead.</b>
</Alert>

Applicable to typing while searching scenario.

**Core Characteristics**

* Async request control(loading, request timing control, etc)
* Debouncing
* Auto cleanup when unmount

## Examples

### Select Search

<code src="./demo/demo1.tsx" />


### Input Search

<code src="./demo/demo2.tsx" />

## API

```javascript
const result: Result = useSearch<T>(
  asyncFn: (value: any) => Promise<T>,
  options?: Options,
);

const result: Result = useSearch<T>(
  asyncFn: (value: any) => Promise<T>,
  deps?: any[],
  options?: Options,
);
```

### Result

| Property | Description                                         | Type                 |
|----------|-----------------------------------------------------|----------------------|
| data     | Search result data                                  | any                  |
| loading  | Loading status                                      | boolean              |
| onChange | Trigger asyncFn, the parameters are sent to asyncFn | (value: any) => void |
| value    | onChange parameters                                 | -                    |
| cancel   | Cancel the ongoing request and debounce in the wait | () => void           |
| run      | Re-execute the asyncFn with the current value       | () => void           |

### Params

| Property | Description                                                        | Type                   | Default |
|----------|--------------------------------------------------------------------|------------------------|---------|
| asyncFn  | Async request function, parameter is onChange's value              | (value: any)=> Promise | -       |
| deps     | Depends on the array, if the deps changes, it will trigger asyncFn |                        |         |
| any[]    | []                                                                 |                        |         |
| options  | Optional configuration item, see Options                           | -                      | -       |


### Options

| Property | Description       | Type   | Default |
|----------|-------------------|--------|---------|
| wait     | Debounce interval | number | 300     |
