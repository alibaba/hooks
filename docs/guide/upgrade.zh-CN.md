---
title: v3 to v4
order: 1
toc: content
demo:
  cols: 2
---

本文档将帮助你从 ahooks 3.x 版本升级到 ahooks 4.x 版本，如果你是 2.x 或者更老的版本，请先参考之前的[升级文档](https://ahooks-v3.js.org/zh-CN/guide/upgrade)升级到 3.x。

## 升级建议

- 如果项目中没有用过 ahooks，请直接使用 ahooks v4 最新版。
- 如果项目中已经安装 ahooks，不想破坏原有的代码逻辑，可以通过[多版本共存](#多版本共存)来过渡升级。
- 如果项目中已经安装 ahooks，并且你有时间处理不兼容的变化，可以参考 [v4 不兼容的变化](#v4-不兼容的变化)来破坏性升级。

## v4 不兼容的变化

<!-- TODO: 请各位开发者在引入破坏性更改后，更新这里的文档。 -->

## 多版本共存

可以通过别名安装 v4，实现多版本共存，以过渡升级。需要注意的是，npm 别名并不是所有的包管理器都有很好的支持。

```bash
$ npm install ahooks4@npm:ahooks@4 --save
# or
$ yarn add ahooks4@npm:ahooks@4
# or
$ pnpm add ahooks4@npm:ahooks@4
# or
$ bun add ahooks4@npm:ahooks@4
```

对应的 package.json 为：

```json
{
  "ahooks": "3.x",
  "ahooks4": "npm:ahooks@4"
}
```

现在，你项目中的 ahooks 还是 v3 版本，ahooks4 是 v4 版本：

```tsx | pure
import React from 'react';
import { useRequest } from 'ahooks'; // v3
import { useRequest } from 'ahooks4'; // v4
```

这样既不会引入不兼容的更改，又可以使用 ahooks v4 新版本的能力。

## 遇到问题

如果您在升级过程中遇到了问题，请到 [GitHub issues](https://github.com/alibaba/hooks/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。
