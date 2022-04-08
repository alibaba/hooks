---
nav:
  path: /hooks
---

# useDisableHistory

禁用浏览器历史记录前进与后退，并提供回调。


## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />




### 高级用法

<code src="./demo/demo2.tsx" />

## API
```typescript
useDisableHistory()
```

```typescript
useDisableHistory({
  callback: () => {
    // 在这里做点什么
    console.log("useDisableHistory callback trigger");
  },
  url: document.URL,
  shouldRefresh: true, // 拦截后刷新页面
});
```

### 参数

| 参数         | 说明         | 类型  | 默认值 |
|--------------|--------------|-------|--------|
| callback | 可选，拦截后的回调函数 | `(url: string) => void` | - |
| url | 可选，pushState的第3个参数 | `string` | document.URL      |
| shouldRefresh | 可选，拦截后是否刷新 | `boolean` | false      |