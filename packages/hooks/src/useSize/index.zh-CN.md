---
nav:
  path: /hooks
---

# useSize

监听 DOM 节点尺寸变化的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 传入 DOM 节点

<code src="./demo/demo2.tsx" />

### 防抖

<code src="./demo/demo3.tsx" />

### 节流

<code src="./demo/demo4.tsx" />

## API

```typescript
const size = useSize(target, options?: {
  debounceOptions?: DebounceOptions,
  throttleOptions?: ThrottleOptions,
});
```

### Params

| 参数                    | 说明                                                                                 | 类型                                                          | 默认值 |
| ----------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ------ |
| target                  | DOM 节点或者 ref                                                                     | `Element` \| `(() => Element)` \| `MutableRefObject<Element>` | -      |
| options.debounceOptions | 防抖参数（同 useDebounce）                                                           | `DebounceOptions`                                             | -      |
| options.throttleOptions | 节流参数（同 useThrottle），如果同时配置了 debounceOptions，优先使用 debounceOptions | `ThrottleOptions`                                             | -      |

### Result

| 参数 | 说明           | 类型                                             | 默认值                                                                    |
| ---- | -------------- | ------------------------------------------------ | ------------------------------------------------------------------------- |
| size | DOM 节点的尺寸 | `{ width: number, height: number } \| undefined` | `{ width: target.clientWidth, height: target.clientHeight } \| undefined` |
