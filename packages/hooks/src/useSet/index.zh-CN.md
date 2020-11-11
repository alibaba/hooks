---
title: useSet
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useSet

一个可以管理 Set 类型状态的 Hook。

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```typescript
const [
  set,
  {
    add,
    has,
    remove,
    reset
  }
] = useSet(initialValue?: Iterable<K>);
```

### Result

| 参数   | 说明             | 类型                    |
|--------|------------------|-------------------------|
| set    | Set 对象         | `Set`                   |
| add    | 添加元素         | `(key: any) => void`    |
| has    | 判断是否存在元素 | `(key: any) => Boolean` |
| remove | 移除元素         | `(key: any) => void`    |
| reset  | 重置为默认值     | `() => void`            |

### Params

| 参数         | 说明                        | 类型          | 默认值 |
|--------------|-----------------------------|---------------|--------|
| initialValue | 可选项，传入默认的 Set 参数 | `Iterable<K>` | -      |
