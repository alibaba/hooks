---
title: useNetwork
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
  order: 12
legacy: /state/use-network
---

# useNetwork

A hook that elegantly return NetworkInformation object containing information about the system's connection.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
interface INetworkState {
  rtt?: number;
  since?: Date;
  type?: string;
  online?: boolean;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

const networkState: INetworkState = useNetwork(
  defaultValue?: INetworkState | (() => INetworkState),
);
```

### Params

| Property | Description                                 | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| defaultValue | Optional，set a default networkState value  | INetworkState \| () => INetworkState | {} |

### INetworkState

| Property | Description                                         | Type                 |
|----------|--------------------------------------|----------------------|
| rtt  | Round-trip time | number |
| type  | Type of connection a device is using to communicate with the network | 'bluetooth' \| 'cellular' \| 'ethernet' \| 'none' \| 'wifi' \| 'wimax' \| 'other' \| 'unknown' |
| online  | Effective online | boolean |
| since  | Online and offline last change time | Date |
| downlink  | Effective bandwidth estimate in megabits per second | number |
| downlinkMax  | The maximum downlink speed | number |
| saveData  | Whether the user agent has set the option to reduce data usage | boolean |
| effectiveType  | The effective type of the connection | 'slow-2g' \| '2g' \| '3g' \| '4g' |
