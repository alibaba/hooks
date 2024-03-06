---
title: useNetwork
nav: Hooks
group:
  title: Scene
  order: 2
order: 8
toc: content
demo:
  cols: 2
---

A hook that tracks the state of network connection.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
interface NetworkState {
  online?: boolean;
  since?: Date;
  rtt?: number;
  type?: string;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

const result: NetworkState = useNetwork();
```

### Result

| Property      | Description                                                    | Type                                                                                           |
| ------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| online        | Whether connected to network                                   | `boolean`                                                                                      |
| since         | `online` latest update time                                    | `Date`                                                                                         |
| rtt           | The effective round-trip time estimate in milliseconds         | `number`                                                                                       |
| type          | The connection type that the user agent is using               | `bluetooth` \| `cellular` \| `ethernet` \| `none` \| `wifi` \| `wimax` \| `other` \| `unknown` |
| downlink      | The effective bandwidth estimate in megabits per second,       | `number`                                                                                       |
| downlinkMax   | An upper bound on the downlink speed of the first network hop  | `number`                                                                                       |
| saveData      | Whether the user agent has set the option to reduce data usage | `boolean`                                                                                      |
| effectiveType | The effective connection type                                  | `slow-2g` \| `2g` \| `3g` \| `4g`                                                              |

More information refer to [MDN NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
