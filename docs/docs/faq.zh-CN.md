# FAQ

以下整理了一些 ahooks 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。

### 当我使用 ahooks 时，报错 `regeneratorRuntime is not defined`，如何解决？

```
// 安装 regenerator-runtime
npm i regenerator-runtime --save

// 在入口文件最上面增加引用
import "regenerator-runtime/runtime";
```

### 我只想使用 `useRequest`， 但似乎我必须安装整个 `ahooks`？

不是的，`useRequest` 在独立包中，可以单独通过安装 `@ahooksjs/use-request` 来使用。

### 我只想用其中一两个 Hooks，但是项目编译后所有的 Hooks 都编译进去了。

可以参考 [按需加载](/zh-CN/docs/getting-started?anchor=按需加载)

### 浏览器兼容性

部分 Hooks 会依赖一些 ES 的新特性，例如 `Set` / `Map` / `Promise`，如果需要兼容较低版本的浏览器（例如 IE <= 11），可以全局引入一些 polyfill，例如 [core-js](https://github.com/zloirock/core-js) 和 [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)。
