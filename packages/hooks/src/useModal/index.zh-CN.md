---
nav:
  path: /hooks
---

# useModal

在 react 中很方便的使用 modal / drawer 等模态组件：

- 不需要维护内部状态。
- 不绑定 UI 组件。
- 内部使用 Context 维护上下文，不会丢失全局配置。

## 代码演示

### 基础用法

<code src="./demo/demo.tsx" />

需要先用`ModalProvider`包裹才可使用 `useModal`。

```ts
import { ModalProvider } from "ahooks";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>
);
```

## API

```ts
import { useModal } from 'ahooks';
import type { ModalProps , ModalResult } from 'ahooks';

const Result:ModalResult = useModal<T,K>((Props:ModalProps<T,K>)=>{},props)
```

## 参数

### Props

| 参数    | 说明                      | 类型                                   | 默认值      |
| ------- | ------------------------- | -------------------------------------- | ----------- |
| visible | 是否显示                  | `boolean`                              | `false`     |
| hide    | 隐藏                      | `() => void`                           | -           |
| destroy | 销毁                      | `() => void`                           | -           |
| data    | Modal 打开时传入的 data   | `T \| Record<string,any> \| undefined` | -           |
| props   | 注册 Modal 时传入的 props | `K`                                    | `undefined` |

> data 与 props 的区别在于，data 是每次打开 Modal 时传入的，props 是注册 Modal 时传入的，props 不会变化。

### Result

| 参数    | 说明 | 类型                                       | 默认值 |
| ------- | ---- | ------------------------------------------ | ------ |
| show    | 显示 | `(data?: T \| Record<string,any>) => void` | -      |
| hide    | 隐藏 | `() => void`                               | -      |
| destroy | 销毁 | `() => void`                               | -      |
