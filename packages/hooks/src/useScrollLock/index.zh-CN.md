---
nav:
  path: /hooks
---

# useScrollLock

锁定目标元素的滚动，常用于模态框、抽屉、全屏浮层等场景。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 共享锁

<code src="./demo/demo2.tsx" />

## API

```typescript
type BasicTarget<T> = T | (() => T | null) | React.MutableRefObject<T | null>;

type Options = {
  target?: BasicTarget<HTMLElement>;
  defaultLocked?: boolean;
  compensateScrollbar?: boolean;
  onLock?: () => void;
  onUnlock?: () => void;
};

type Actions = {
  lock: () => void;
  unlock: () => void;
  toggle: () => void;
};

const useScrollLock: (options?: Options) => readonly [boolean, Actions];
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| target | 需要锁定滚动的元素 | `BasicTarget<HTMLElement>` | `document.body` |
| defaultLocked | 挂载后立即锁定 | `boolean` | `false` |
| compensateScrollbar | 锁定 body 时用 `padding-right` 补齐滚动条宽度，避免页面抖动 | `boolean` | `true` |
| onLock | 本实例获取锁时触发 | `() => void` | - |
| onUnlock | 本实例释放锁时触发 | `() => void` | - |

### 返回值

| 参数 | 说明 | 类型 |
| ---- | ---- | ---- |
| locked | 当前实例是否持锁 | `boolean` |
| actions.lock | 获取锁；已持锁时为空操作 | `() => void` |
| actions.unlock | 释放锁 | `() => void` |
| actions.toggle | 切换锁定状态 | `() => void` |

### 说明

- **锁是共享的**：同一元素上的多个 `useScrollLock` 实例共用一份锁记录。两个浮层同时打开时，关闭其中一个不会恢复滚动，直到最后一个释放才还原原始的内联样式。
- **样式精确还原**：锁定时记录元素原有的 `overflow` 与 `padding-right`，全部释放后原样恢复，不会覆盖调用方自己的样式。
- **服务端安全**：服务端渲染不访问 DOM，返回请求的 `defaultLocked`；卸载时自动释放，避免页面停在锁定状态。
