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

## API

```typescript
useLongPress(
  onLongPress: (event: MouseEvent | TouchEvent) => void,
  target: Target,
  options?: {
    delay?: number,
    onClick?: (event: MouseEvent | TouchEvent) => void,
  }
);
```

### Params

| 参数        | 说明             | 类型                                                        | 默认值 |
|-------------|------------------|-------------------------------------------------------------|--------|
| onLongPress | 触发函数         | `(event: MouseEvent \| TouchEvent) => void`                 | -      |
| target      | DOM 节点或者 Ref | `Element` \| `() => Element` \| `MutableRefObject<Element>` | -      |
| options     | 可选配置项       | `Options`                                                   | -      |

### Options
| 参数    | 说明     | 类型      | 默认值 |
|---------|----------|-----------|--------|
| delay   | 长按时间 | `number`  | `300` |
| onClick | 点击事件 | `boolean` | `true` |

### 备注

禁用在手机上长按选择文本的能力请参考：https://stackoverflow.com/a/11237968
