# useRequest

Production-ready React Hook to manage asynchronous data.

**Core Characteristics**

* Auto-triggered request and Manually-triggered Request
* SWR(stale-while-revalidate)
* Cache / Preload
* Refresh On Window Focus
* Polling
* Debounce
* Throttle
* Concurrent Request
* Dependent Request
* Loading Delay
* Pagination
* Load more, data recovery and scroll position recovery
* ......

## Installing

Inside your React project directory, run the following:

yarn add @ahooksjs/use-request

```bash
yarn add @ahooksjs/use-request
```

Or with npm:

```bash
npm install @ahooksjs/use-request
```

## Example

```javascript
import useRequest from '@ahooksjs/use-request';

const { data, error, loading, run } = useRequest('/api/user');
```

## Documentation

https://ahooks.js.org/hooks/async
