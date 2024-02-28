---
title: useWhyDidYouUpdate
nav: Hooks
group:
  title: Dev
  order: 8
order: 2
toc: content
---

# useWhyDidYouUpdate

Help developers troubleshoot what changes have caused component rerender.

## Examples

### Default usage

<code src="./demo/demo1.tsx"></code>

## API

```typescript
type IProps = Record<string, any>;

useWhyDidYouUpdate(componentName: string, props: IProps): void;
```

### Params

| Property      | Description                                                                                 | Type     | Default |
| ------------- | ------------------------------------------------------------------------------------------- | -------- | ------- |
| componentName | Required, the name of the observation component                                             | `string` | -       |
| props         | Required, data to be observed (`state` or `props` and other data that may lead to rerender) | `object` | -       |

### Result

Please open the browser console, you can see the output of the changed observed `state` or `props`.
