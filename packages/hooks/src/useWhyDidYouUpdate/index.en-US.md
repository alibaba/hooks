---
title: useWhyDidYouUpdate
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /state/use-why-did-you-update
---

# useWhyDidYouUpdate

Help developers troubleshoot what changes have caused component rerender .

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
type IProps = {
  [key: string]: any;
}
useWhyDidYouUpdate(ComponentName: string, props: IProps): void;
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| componentName | Required, the name of the observation component  | string | - |
| props | Required, data to be observed (current component `state` or passed-in `props` and other data that may lead to rerender) | object | - |


### Result

Please open the browser console, you can see the output of the changed observed `state` or `props`.
