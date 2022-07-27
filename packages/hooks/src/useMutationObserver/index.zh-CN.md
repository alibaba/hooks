---
nav:
  path: /hooks
---

# useMutationObserver

一个监听指定的 DOM 发生变化的 hook

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useMutationObserver(
  target: Target,
  callback: MutationCallback,
  options?: MutationObserverInit,
);
```

### Params

| 参数     | 说明             | 类型                                                                | 默认值 |
| -------- | ---------------- | ------------------------------------------------------------------- | ------ |
| target   | DOM 节点或者 Ref | `Element` \| `() => Element` \| `MutableRefObject<Element>`         |        |
| callback | 触发的回调函数   | `(mutations: MutationRecord[], observer: MutationObserver) => void` |        |
| options  | 设置项           | `MutationObserverInit`                                              |        |

### Options

| 参数                  | 说明                                                                                     | 类型       | 默认值  |
| --------------------- | ---------------------------------------------------------------------------------------- | ---------- | ------- |
| attributeFilter       | 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知         | `string[]` |         |
| attributeOldValue     | 当监视节点的属性改动时，将此属性设为 `true` 将记录任何有改动的属性的上一个值             | `boolean`  |         |
| attributes            | 设为 `true` 以观察受监视元素的属性值变更                                                 | `boolean`  | `false` |
| characterData         | 设为 `true` 以监视指定目标节点或子节点树中节点所包含的字符数据的变化                     | `boolean`  |         |
| characterDataOldValue | 设为 `true` 以在文本在受监视节点上发生更改时记录节点文本的先前值                         | `boolean`  |         |
| childList             | 设为 `true` 以监视目标节点添加或删除新的子节点（如果 subtree 为 true，则也包含子孙节点） | `boolean`  | `false` |
| subtree               | 设为 `true` 以将监视范围扩展至目标节点整个节点树中的所有节点                             | `boolean`  | `false` |

### notice

注意，以下任一情况都会抛出异常：

<!-- https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe#%E5%BC%82%E5%B8%B8 -->

- 在 `options` 配置项对象中，必须至少将 `attributes`、`characterData` 或 `childList` 中的一个属性设置为 `true`，否则会报错

- `attributes` 选项为 `false`（表示不监视属性更改），但是 `attributeOldValue` 选项为 `true` 并且/或者 `attributeFilter` 配置存在

- `characterDataOldValue` 选项为 `true`，但是 `characterData` 选项为 `false`（表示不跟踪字符更改）
