---
nav:
  path: /hooks
---

# useSet

管理 Set 类型状态的 Hook。

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```typescript
const [
  set,
  {
    add,
    remove,
    reset
  }
] = useSet<K>(initialValue);
```

### Result

| 参数   | 说明         | 类型               |
| ------ | ------------ | ------------------ |
| set    | Set 对象     | `Set<K>`           |
| add    | 添加元素     | `(key: K) => void` |
| remove | 移除元素     | `(key: K) => void` |
| reset  | 重置为默认值 | `() => void`       |

### Params

| 参数         | 说明                        | 类型          | 默认值 |
| ------------ | --------------------------- | ------------- | ------ |
| initialValue | 可选项，传入默认的 Set 参数 | `Iterable<K>` | -      |
