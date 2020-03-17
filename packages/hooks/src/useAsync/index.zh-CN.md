---
title: useAsync
nav:
  title: Hooks
  path: /hooks
group:
  title: 废弃
  path: /deprecated
legacy: /zh-CN/deprecated/use-api
---

# useAsync

<Alert>
<b>⚠️警告: useAsync 已经被废弃了，将在下一个大版本时移除，你可以使用 <a href="/zh-CN/async">useRequest</a> 代替。</b>
</Alert>

一个帮你管理异步函数的 Hook，支持立即执行，手动触发执行，轮询。

## 代码演示

### 默认用法

<code src="./demo/demo1.tsx" />


### 手动触发执行

<code src="./demo/demo2.tsx" />


### 轮询

<code src="./demo/demo3.tsx" />


### 表单提交

<code src="./demo/demo4.tsx" />


## API

```javascript
const result: Result = useAsync<T>(
  asyncFn: (value: any) => Promise<T>,
  options?: Options,
);

const result: Result = useAsync<T>(
  asyncFn: (value: any) => Promise<T>,
  deps?: any[],
  options?: Options,
);
```

### Result

| 参数         | 说明                       | 类型                 |
|--------------|----------------------------|----------------------|
| loading      | 是否正在加载               | boolean              |
| params       | 传给 async function 的参数 | any[]                |
| error        | 请求错误数据               | Error                |
| data         | 请求成功数据               | any |
| cancel       | 取消                       | () => void          |
| run          | 执行                       | () => Promise<T\>   |
| timer.stop   | 轮询取消                   | () => void          |
| timer.pause  | 轮询暂停                   | () => void          |
| timer.resume | 轮询继续                   | () => void          |


### 参数

| 参数    | 说明                   | 类型             | 默认值         |   |
|---------|------------------------|------------------|----------------|---|
| asyncFn | 异步请求函数           | (...args: Args \| any)=> Promise | - |
| deps    | 依赖数组               | any[]            | []             |   |
| options | 可选配置项，见 Options | -                | -              |   |

### Options

| 参数            | 说明                                                   | 类型                              | 默认值 |
|-----------------|--------------------------------------------------------|-----------------------------------|--------|
| manual          | 是否需要手动触发                                       | boolean                           | false  |
| pollingInterval | 轮询间隔毫秒，只有设置了 pollingInterval，才会开启轮询 | number                            | -      |
| onSuccess       | 执行成功时的回掉                                       | (d: T, params: any[]) => void     | -      |
| onError         | 执行失败时的回掉                                       | (e: Error, params: any[]) => void | -      |
| autoCancel      | 是否需要关闭竞态处理                                   | boolean                           | true  |
