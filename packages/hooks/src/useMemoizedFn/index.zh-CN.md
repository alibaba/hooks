---
nav:
  path: /hooks
---

# useMemoizedFn

持久化 function 的 Hook，一般情况下，可以使用 useMemoizedFn 完全代替 useCallback，特殊情况见 [FAQ](#faq)。

在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化。

```js
const [state, setState] = useState('');

// 在 state 变化时，func 地址会变化
const func = useCallback(() => {
  console.log(state);
}, [state]);
```

使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。

```js
const [state, setState] = useState('');

// func 地址永远不会变化
const func = useMemoizedFn(() => {
  console.log(state);
});
```

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 性能提升

<code src="./demo/demo2.tsx" />

## API

```typescript
const memoizedFn = useMemoizedFn<T>(fn: T): T;
```

### Result

| 参数       | 说明                       | 类型                      |
| ---------- | -------------------------- | ------------------------- |
| memoizedFn | 引用地址永远不会变化的函数 | `(...args: any[]) => any` |

### Params

| 参数 | 说明             | 类型                      | 默认值 |
| ---- | ---------------- | ------------------------- | ------ |
| fn   | 需要持久化的函数 | `(...args: any[]) => any` | -      |

## FAQ

### `useMemoizedFn` 返回的函数没有继承 fn 自身的属性？

`useMemoizedFn` 返回的函数与传入的 fn 的引用完全不同，且没有继承 fn 自身的属性。如果想要持久化后函数自身的属性不丢失，目前 `useMemoizedFn` 满足不了，请降级使用 `useCallback`、`useMemo`。

Related issues: [2273](https://github.com/alibaba/hooks/issues/2273)
