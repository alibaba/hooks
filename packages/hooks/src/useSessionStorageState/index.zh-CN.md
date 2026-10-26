---
nav:
  path: /hooks
---

# useSessionStorageState

将状态存储在 sessionStorage 中的 Hook。

用法与 [useLocalStorageState](./use-local-storage-state) 一致。

## 同步范围

设置了 `listenStorageChange: true` 的实例，会同步同一页面中通过 Hook 更新函数对相同 `key` 所做的修改，也会接收同一标签页中同源 iframe 的存储更新。

与 `localStorage` 不同，[`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) 按标签页隔离，因此这个选项不会跨标签页同步状态。如需在同源标签页之间同步，请使用 `useLocalStorageState` 并设置 `listenStorageChange: true`。
