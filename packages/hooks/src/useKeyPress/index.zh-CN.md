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

### 精确匹配
<code src="./demo/demo7.tsx">

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
| exactMatch | 开启精确匹配,触发的键只有在精确匹配监听的键才会触发事件,比如触发的是 `[shift + c]`，监听 `[c]` 是不会触发事件的，默认不开启 | `boolean`  | `false`       |

## Remarks

1. 按键别名见 [代码](TODO)

2. 修饰键

```text
ctrl
alt
shift
meta
```
