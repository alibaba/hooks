---
nav:
  path: /hooks
---

# useIdle

判断用户是否已经空闲（一段时间内没有任何操作），常用于会话超时、自动保存、屏保或降级轮询。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 自定义目标与事件

<code src="./demo/demo2.tsx" />

## API

```typescript
type BasicTarget<T> = T | (() => T | null) | React.MutableRefObject<T | null>;

type Options = {
  events?: readonly string[];
  target?: BasicTarget<Document | Element | Window>;
  initialState?: boolean;
  onChange?: (idle: boolean) => void;
};

const useIdle: (timeout?: number, options?: Options) => boolean;
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| timeout | 触发空闲的毫秒数；小于等于 0 时关闭检测 | `number` | `60000` |
| events | 视为「活动」的事件名列表 | `readonly string[]` | `['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart', 'scroll']` |
| target | 监听的元素或 Ref，默认整个文档 | `BasicTarget<Document \| Element \| Window>` | `document` |
| initialState | 首次超时前的状态 | `boolean` | `false` |
| onChange | 空闲状态变化时触发 | `(idle: boolean) => void` | - |

### 返回值

| 参数 | 说明 | 类型 |
| ---- | ---- | ---- |
| idle | 当前是否空闲 | `boolean` |

### 说明

- **每次活动都会重置计时**：监听的事件触发时立即回到非空闲，并重新开始计时。
- **默认监听整个文档**：传入 `target` 后只观察该元素上的活动，页面其他区域的鼠标移动不会重置计时。
- **服务端安全**：服务端渲染不访问 DOM，直接返回 `initialState`；`timeout <= 0` 时关闭检测。
