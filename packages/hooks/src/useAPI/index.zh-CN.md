---
title: useAPI
group:
  title: 废弃
  path: /deprecated
---

# useAPI

<Alert>
<b>⚠️警告: useAPI 已经被废弃了，将在下一个大版本时移除，你可以使用 <a href="/zh-CN/async">useRequest</a> 代替。</b>
</Alert>

一个内置 `umi-request`，帮你管理网络请求的 Hook。
支持立即执行，手动触发执行，轮询。
> 这个 Hook 主要展示了如何封装 useAsync 能力，可能您不需要使用 umi-request，
但是可以参照 [useAPI 的方式](https://github.com/umijs/hooks/blob/master/src/useAPI/index.ts)封装 useAsync。在这里可以添加请求头信息，根据接口格式做统一报错处理，数据转换等等。
当然，如果 useAPI 可以满足您的需求，也可以直接在您的业务中使用。

## 代码演示

### 默认用法

<code src="./demo/demo1.tsx" />

### 手动触发执行

<code src="./demo/demo2.tsx" />

### 轮询

<code src="./demo/demo3.tsx" />

### 修改 request 方法

<code src="./demo/demo4.tsx" />

## API

接口参考 [useAsync](./useAsync)