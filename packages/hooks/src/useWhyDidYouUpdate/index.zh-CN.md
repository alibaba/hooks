---
title: useWhyDidYouUpdate
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useWhyDidYouUpdate

帮助开发者排查是什么改变导致了组件的 rerender。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
type IProps = {
  [key: string]: any;
}
useWhyDidYouUpdate(componentName: string, props: IProps): void;
```

### Params

| 参数          | 说明                                                                                   | 类型   | 默认值 |
|---------------|----------------------------------------------------------------------------------------|--------|--------|
| componentName | 必填，观测组件的名称                                                                   | `string` | -      |
| props         | 必填，需要观测的数据（当前组件 `state` 或者传入的 `props` 等可能导致 rerender 的数据） | `object` | -      |


### Result

打开控制台，可以看到改变的 被观测的 `state` 或者 `props` 等输出。
