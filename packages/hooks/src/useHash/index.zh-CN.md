---
nav:
  path: /hooks
---

# useHash

这是一个修改 hash 值的 hook 函数。

## 示例

### 基础示例

<code src="./demo/demo.tsx" />

## 接口

```typescript
const [hash,setHash] = useHash()
```

#### 参数

无参数

#### 返回值

| 参数    | 说明               | 类型                 | 默认值 |
| ------- | ------------------ | -------------------- | ------ |
| hash    | hash 值            | string               | -      |
| setHash | 修改 hash 值的函数 | `(v:string) => void` | -      |
