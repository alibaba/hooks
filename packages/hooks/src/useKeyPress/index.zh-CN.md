---
nav:
  path: /hooks
---

# useKeyPress

监听键盘按键，支持组合键，支持按键别名。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 监听组合按键

<code src="./demo/demo6.tsx" />

### 监听多个按键

<code src="./demo/demo3.tsx" />

### 自定义监听方式

<code src="./demo/demo4.tsx" />

### 自定义 DOM

<code src="./demo/demo5.tsx" />

## API

```typescript
type keyType = number | string;
type KeyFilter = keyType | keyType[] | ((event: KeyboardEvent) => boolean);

useKeyPress(
  keyFilter: KeyFilter, 
  eventHandler: EventHandler, 
  options?: Options
)
```

### Params

| 参数         | 说明                                         | 类型                                                            | 默认值 |
|--------------|----------------------------------------------|-----------------------------------------------------------------|--------|
| keyFilter    | 支持 keyCode、别名、组合键、数组，自定义函数 | `keyType` \| `keyType[]` \| `(event: KeyboardEvent) => boolean` | -      |
| eventHandler | 回调函数                                     | `(event: KeyboardEvent) => void`                                | -      |
| options      | 可选配置项                                   | `Options`                                                       | -      |

### Options

| 参数   | 说明             | 类型                                                        | 默认值        |
|--------|------------------|-------------------------------------------------------------|---------------|
| events | 触发事件         | `('keydown' \| 'keyup')[]`                                  | `['keydown']` |
| target | DOM 节点或者 ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -             |

## Remarks

1. 按键别名见 [代码](TODO)

2. 修饰键

```text
ctrl
alt
shift
meta
```
