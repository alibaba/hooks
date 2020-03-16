---
title: useBoolean
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
  order: 11
legacy: /zh-CN/state/use-boolean
---

# useBoolean

优雅的管理 boolean 值的 Hook。

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```javascript
const {
  state, 
  toggle,
  setTrue,
  setFalse
} = useBoolean(
  defaultValue?: boolean,
);
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

