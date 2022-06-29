# 贡献指南

这篇指南会指导你如何为 `ahooks` 贡献一份自己的力量，请在你要提 issue 或者 pull request 之前花几分钟来阅读一遍这篇指南。

## 透明的开发

我们所有的工作都会放在 [GitHub](https://github.com/alibaba/hooks) 上。不管是核心团队的成员还是外部贡献者的 pull request 都需要经过同样流程的 review。

## 新增功能

如果你想新增一个 Hooks，我们建议你先建立一个 issue，说明该 Hooks 的应用场景及用法，参考 [[RFC] useLockFn](https://github.com/alibaba/hooks/issues/562)。

然后你可以基于已有 Hook 来初始化一个新的 Hook。

## Pull Request

我们会关注所有的 pull request，会 review 以及合并你的代码，也有可能要求你做一些修改或者告诉你我们为什么不能接受这样的修改。

在你发送 Pull Request 之前，请确认你是按照下面的步骤来做的：

1. 基于 master 分支做修改。

2. 如果你修复了一个 bug 或者新增了一个功能，请确保写了相应的测试，这很重要。

3. 确认所有的测试是通过的 `pnpm run test`。

## 开发流程

在你 clone 代码并且使用 `pnpm run init` 安装完依赖后，你还可以运行下面几个常用的命令：

1. `pnpm start` 在本地运行 `ahooks` 网站。

2. `pnpm run test` 运行测试。

3. `pnpm run build` 构建编译。
