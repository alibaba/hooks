---
nav:
  path: /hooks
---

# useLongPress

监听目标元素的长按事件。

## 代码演示

### 基本使用

<code src="./demo/demo1.tsx"/>

### 同时监听点击和长按事件

<code src="./demo/demo2.tsx"/>

### 移动阈值

<code src="./demo/demo3.tsx"/>

## API

```typescript
useLongPress(
  onLongPress: (event: MouseEvent | TouchEvent) => void,
  target: Target,
  options: {
    delay?: number;
    moveThreshold?: { x?: number; y?: number };
    onClick?: (event: MouseEvent | TouchEvent) => void;
    onLongPressEnd?: (event: MouseEvent | TouchEvent) => void;
  }
);
```

### Params

| 参数        | 说明             | 类型                                                        | 默认值 |
| ----------- | ---------------- | ----------------------------------------------------------- | ------ |
| onLongPress | 触发函数         | `(event: MouseEvent \| TouchEvent) => void`                 | -      |
| target      | DOM 节点或者 Ref | `Element` \| `() => Element` \| `MutableRefObject<Element>` | -      |
| options     | 可选配置项       | `Options`                                                   | `{}`   |

### Options

| 参数           | 说明                                 | 类型                                        | 默认值 |
| -------------- | ------------------------------------ | ------------------------------------------- | ------ |
| delay          | 长按时间                             | `number`                                    | `300`  |
| moveThreshold  | 按下后移动阈值，超出则不触发长按事件 | `{ x?: number; y?: number }`                | -      |
| onClick        | 点击事件                             | `(event: MouseEvent \| TouchEvent) => void` | -      |
| onLongPressEnd | 长按结束事件                         | `(event: MouseEvent \| TouchEvent) => void` | -      |

### 备注

禁用在手机上长按选择文本的能力请参考：https://stackoverflow.com/a/11237968
