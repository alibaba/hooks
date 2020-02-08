---
title: useThrottleFn
group:
  title: SideEffect
  path: /side-effect
  order: 700
---

# useThrottleFn

用来处理函数节流的 Hook。

## 代码演示

### 基础使用

<code src="./demo/demo1.tsx" />


### 合理利用 deps

<code src="./demo/demo2.tsx" />


## API

```javascript
const {
  run,
  cancel
} = useThrottleFn(
  fn: (...args: any[]) => any,
  wait: number
);

const {
  run,
  cancel
} = useThrottleFn(
  fn: (...args: any[]) => any,
  deps: any[],
  wait: number
);
```

### Result

| 参数   | 说明                               | 类型                    |
|--------|------------------------------------|-------------------------|
| run    | 触发执行 fn，函数参数将会传递给 fn | (...args: any[]) => any |
| cancel | 取消当前节流                       | () => void              |

### Params

| 参数 | 说明                                          | 类型                    | 默认值 |
|------|-----------------------------------------------|-------------------------|--------|
| fn   | 需要节流的函数                                | (...args: any[]) => any | -      |
| deps | 依赖数组，如果数组变化，则会在节流后，触发 fn | any[]                   | -      |
| wait | 节流间隔时间，单位为毫秒                      | number                  | 1000   |