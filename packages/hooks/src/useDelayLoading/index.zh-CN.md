---
nav:
  path: /hooks
---

# useDelayLoading

一个延时改变`loading`状态的`hook`，适合在进行异步操作需要加载`loading`时使用。

请求数据前设置为`true`，在内部会延迟设置值。

如果在延迟时间内设置为`false`，会取消设置`true`的逻辑。

如果某一次不想延迟改变状态，可以在`setLoading`时传递第二个参数传递`true`, 会立即改变状态。

`useDelayLoading`的主要作用：

1. 页面数据请求速度快时，可以避免`loading`短暂出现造成的页面闪烁。
2. 页面数据请求速度快时，可以有效减少一次组件渲染次数，提升性能。

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```typescript
const [ loading, setLoading ] = useDelayLoading(initValue: boolean, delay?: number);
```

### Params

| 参数      | 说明                                                  | 类型               |
| --------- | ----------------------------------------------------- | ------------------ |
| initValue | loading初始值                                         | boolean            |
| delay     | 设置loading为true的延时时间,支持动态变化，默认为200ms | undefined \| number |

