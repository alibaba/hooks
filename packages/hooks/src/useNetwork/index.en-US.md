---
title: useNetwork
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
  order: 12
---

# useNetwork

A hook that can manage the state of network.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

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

| Property | Description                                         | Type                 |
|----------|--------------------------------------|----------------------|
| online  | Effective online | `boolean` |
| since  | Online and offline last change time | `Date` |
| rtt  | Round-trip time | `number` |
| type  | Type of connection a device is using to communicate with the network | `bluetooth` \| `cellular` \| `ethernet` \| `none` \| `wifi` \| `wimax` \| `other` \| `unknown` |
| downlink  | Effective bandwidth estimate in megabits per second | `number` |
| downlinkMax  | The maximum downlink speed | `number` |
| saveData  | Whether the user agent has set the option to reduce data usage | `boolean` |
| effectiveType  | The effective type of the connection | `slow-2g` \| `2g` \| `3g` \| `4g` |
