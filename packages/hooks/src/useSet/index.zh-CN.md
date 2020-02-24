---
title: useSet
group:
  title: State1
  path: /state1
  order: 600
---

# useSet

一个可以将状态管理在 Set 类型中的 Hook 。

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```javascript
const [
  set,
  {
    add,
    has,
    remove,
    reset
  }
] = useSet(initialValue?);
```

### Result

| 参数     | 说明                                 | 类型                 |
|----------|--------------------------------------|----------------------|
| state  | 状态值                         | boolean              |
| toggle | 触发状态更改的函数,可以接受一个可选参数修改状态值 | (value?: any) => void |
| setTrue | 设置状态值为 true | () => void |
| setFalse | 设置状态值为 false | () => void |

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| defaultValue | 可选项，传入默认的状态值  | boolean \| undefined | false      |

