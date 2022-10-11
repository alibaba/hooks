---
nav:
  path: /hooks
---

# useHash

监听 location hash。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```javascript
const [ hash, setHash ] = useHash({ onChange });
```

### Params

| 参数    | 说明         | 类型      | 默认值 |
| ------- | ------------ | --------- | ------ |
| options | 额外的配置项 | `Options` | -      |

### Options

| 参数     | 说明            | 类型                                       | 默认值 |
| -------- | --------------- | ------------------------------------------ | ------ |
| onChange | hash 变化时触发 | `(hahs: string, prevHash: string) => void` | -      |

### Result

| 参数    | 说明        | 类型                        |
| ------- | ----------- | --------------------------- |
| hash    | 当前的 hash | `string`                    |
| setHash | 修改 hash   | `(newHash: string) => void` |
