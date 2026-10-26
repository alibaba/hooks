---
nav:
  path: /hooks
---

# useSessionStorageState

A Hook for store state into sessionStorage.

Usage is exactly the same as [useLocalStorageState](./use-local-storage-state).

## Synchronization scope

An instance with `listenStorageChange: true` stays in sync with updates made through the Hook's setter to the same `key` on the same page. It also receives storage updates from same-origin iframes within the same tab.

Unlike `localStorage`, [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) is isolated per tab, so this option does not synchronize state across tabs. For synchronization across same-origin tabs, use `useLocalStorageState` with `listenStorageChange: true`.
