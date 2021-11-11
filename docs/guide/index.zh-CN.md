# 介绍

ahooks，发音 [eɪ hʊks]，是一套高质量可靠的 React Hooks 库。在当前 React 项目研发过程中，一套好用的 React Hooks 库是必不可少的，希望 ahooks 能成为您的选择。

相较于社区上其它 Hooks 库，ahooks 有以下几个优势。

## 内容丰富

ahooks 提供了 70+ Hooks，其中不仅包括一些常见的基础 Hooks，更是提供了大量从业务中提炼的高级 Hooks。比如：

- useRequest：强大的异步数据管理的 Hooks，React 项目中的网络请求场景使用它就够了。
- useInfiniteScroll：封装了常见的无限滚动逻辑。
- useVirtualList：提供了虚拟化长列表能力。
- ......

## 支持 SSR

ahooks 全面支持 SSR，相关文档可见《[React Hooks & SSR](/zh-CN/guide/blog/ssr)》。

## 避免闭包问题

ahooks 通过对输入输出函数的特殊处理，尽力帮助大家避免闭包问题。

**ahooks 所有的输出函数，地址是不会变化的。**

```ts
const [state, setState] = React.useState();
```

大家熟知的`React.useState`返回的 `setState` 函数，地址是不会变化的。

ahooks 所有 Hooks 返回的函数，也有和 `setState` 一样的特性，地址不会变化。

```ts
const [state, { toggle }] = useToggle();
```

比如 `useToggle` 返回的 `toggle` 函数，地址就是永远固定的。

**ahooks 所有的输入函数，永远使用最新的一份。**

对于接收的函数，ahooks 会做一次特殊处理，保证每次调用的函数永远是最新的。

```ts
const [state, setState] = useState();

useInterval(() => {
  console.log(state);
}, 1000);
```

比如以上示例，`useInterval` 调用的函数永远是最新的。

相关文档可见《[ahooks 输入输出函数规范](/zh-CN/guide/blog/function)》。
