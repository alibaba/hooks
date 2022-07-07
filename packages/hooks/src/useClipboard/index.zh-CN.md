---
nav:
  path: /hooks
---

# useClipboard

处理粘贴板的 Hook

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

##### 默认数据源

<code src="./demo/demo3.tsx" />

## API

```typescript
const { text, isSupport, onCopy } = useClipboard({
  source?: string
});
```

### Params

| 参数    | 说明                 | 类型             | 默认值 |
| ------- | -------------------- | ---------------- | ------ |
| options | 可选项，额外的配置项 | ClipboardOptions | `{}`   |

### ClipboardOptions

| 参数   | 说明                     | 类型   | 默认值 |
| ------ | ------------------------ | ------ | ------ |
| source | 可选项，需要复制的数据源 | string | `""`   |

### Result

| 参数      | 说明                 | 类型                                |
| --------- | -------------------- | ----------------------------------- |
| isSupport | 是否支持复制粘贴操作 | `boolean`                           |
| text      | 复制后的数据         | `string`                            |
| onCopy    | 复制事件             | `(value?: string) => Promise<void>` |
