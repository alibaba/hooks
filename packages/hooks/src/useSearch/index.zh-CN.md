---
title: useSearch
nav:
  title: Hooks
  path: /hooks
group:
  title: 废弃
  path: /deprecated
legacy: /zh-CN/deprecated/use-search
---

# useSearch

<Alert>
<b>⚠️警告: useSearch 已经被废弃了，将在下一个大版本时移除，你可以使用 <a href="/zh-CN/async?anchor=防抖">useRequest debounceInterval</a> 代替。</b>
</Alert>

适用于常见的边输入，边异步搜索的场景。

**核心特性**

* 异步请求控制（loading, 请求时序控制等）
* 防抖
* 自动卸载

## 代码演示

### Select Search

<code src="./demo/demo1.tsx" />


### Input Search

<code src="./demo/demo2.tsx" />


## API

```javascript
const result: Result = useSearch<T>(
  asyncFn: (value: any) => Promise<T>,
  options?: Options,
);

const result: Result = useSearch<T>(
  asyncFn: (value: any) => Promise<T>,
  deps?: any[],
  options?: Options,
);
```

### Result

| 参数     | 说明                                 | 类型                 |
|----------|--------------------------------------|----------------------|
| data     | 搜索结果数据                         | any                  |
| loading  | 是否正在加载                         | boolean              |
| onChange | 触发搜索的函数，参数会发送给 asyncFn | (value: any) => void |
| value    | onChange 的参数                      | -                    |
| cancel   | 取消进行中的请求和等待中的防抖       | () => void           |
| run      | 用当前 value 重新执行一次 asyncFn    | () => void           |

### 参数

| 参数    | 说明                                           | 类型                   | 默认值 |
|---------|------------------------------------------------|------------------------|--------|
| asyncFn | 异步请求数据函数，函数参数为 onChange 的 value | (value: any)=> Promise | -      |
| deps    | 依赖数组，如果 deps 变化，会触发 asyncFn       | any[]                  | []     |
| options | 可选配置项，见 Options                         | -                      | -      |


### Options

| 参数 | 说明         | 类型   | 默认值 |
|------|--------------|--------|--------|
| wait | 防抖时间间隔 | number | 300    |
