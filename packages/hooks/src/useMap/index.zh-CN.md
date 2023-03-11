---
nav:
  path: /hooks
---

# useMap

管理 Map 类型状态的 Hook。

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```typescript
const [
  map,
  {
    set,
    setAll,
    remove,
    reset,
    get
  }
] = useMap<K, V>(initialValue);
```

### Result

| 参数   | 说明                  | 类型                                 |
| ------ | --------------------- | ------------------------------------ |
| map    | Map 对象              | `Map<K, V>`                          |
| set    | 添加元素              | `(key: K, value: V) => void`         |
| get    | 获取元素              | `(key: K) => V \| undefined`         |
| setAll | 生成一个新的 Map 对象 | `(newMap: Iterable<[K, V]>) => void` |
| remove | 移除元素              | `(key: K) => void`                   |
| reset  | 重置为默认值          | `() => void`                         |

### Params

| 参数         | 说明                        | 类型               | 默认值 |
| ------------ | --------------------------- | ------------------ | ------ |
| initialValue | 可选项，传入默认的 Map 参数 | `Iterable<[K, V]>` | -      |
