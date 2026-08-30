---
title: ahooks - React Hooks Library
hero:
  image: /logo.svg
  desc: 一套高质量可靠的 React Hooks 库
  actions:
    - text: 指南
      link: /zh-CN/guide
    - text: Hooks 列表
      link: /zh-CN/hooks
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by [dumi](https://d.umijs.org)
---

[![NPM version][image-1]][1]
[![NPM downloads][image-2]][2]
[![npm](https://img.shields.io/npm/dw/ahooks-v2?label=downloads%28v2%29)](https://www.npmjs.com/package/ahooks-v2)
[![npm](https://img.shields.io/github/issues/alibaba/hooks)](https://github.com/alibaba/hooks/issues)
[![Coverage Status](https://coveralls.io/repos/github/alibaba/hooks/badge.svg?branch=master)](https://coveralls.io/github/alibaba/hooks?branch=master)
![gzip size](https://img.badgesize.io/https:/unpkg.com/ahooks/dist/ahooks.js?label=gzip%20size&compression=gzip)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/alibaba/hooks.svg)](http://isitmaintained.com/project/alibaba/hooks "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/alibaba/hooks.svg)](http://isitmaintained.com/project/alibaba/hooks "Average time to resolve an issue")
![GitHub](https://img.shields.io/github/license/alibaba/hooks)

## ✨ 特性

- 易学易用
- 支持 SSR
- 对输入输出函数做了特殊处理，避免闭包问题
- 包含大量提炼自业务的高级 Hooks
- 包含丰富的基础 Hooks
- 使用 TypeScript 构建，提供完整的类型定义文件

## 📦 安装

```bash
$ npm install --save ahooks
# or
$ yarn add ahooks
# or
$ pnpm add ahooks
# or
$ bun add ahooks
```

## 🔨 使用

```ts
import { useRequest } from "ahooks";
```

## 💻 在线体验

[![Edit demo for ahooks](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/demo-for-ahooks-forked-fg79k?file=/src/App.js)

## 🤝 参与共建

```bash
$ git clone git@github.com:alibaba/hooks.git
$ cd hooks
$ pnpm run init
$ pnpm start
```

打开浏览器访问 http://127.0.0.1:8000

我们欢迎所有人参与共建，请参考[CONTRIBUTING.MD](https://github.com/alibaba/hooks/blob/master/CONTRIBUTING.zh-CN.MD)

感谢所有贡献者：

<a href="https://github.com/alibaba/hooks/graphs/contributors">
  <img src="https://opencollective.com/ahooks/contributors.svg?width=960&button=false" alt="contributors" />
</a>

## 👥 交流讨论

<img alt="ahooks discussion group 1" draggable="false" src="https://github.com/user-attachments/assets/dda464be-26cf-4c83-8fee-16862fb916cb" width="200" style='display:inline' />
<img alt="ahooks discussion group 2" draggable="false" src="https://github.com/user-attachments/assets/c804a026-3b07-4a20-ad7e-83cf2f86bc9a" width="200" style='display:inline' />
<img alt="ahooks discussion group 3" draggable="false" src="https://github.com/user-attachments/assets/52ac8ef8-6506-4540-a17d-823ae4371b88" width="200" style='display:inline' />

[1]: https://www.npmjs.com/package/ahooks
[2]: https://npmjs.org/package/ahooks
[image-1]: https://img.shields.io/npm/v/ahooks.svg?style=flat
[image-2]: https://img.shields.io/npm/dm/ahooks.svg?style=flat
