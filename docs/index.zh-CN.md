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

[![NPM version next][image-1]][1]
&nbsp;
[![NPM downloads][image-2]][2]
&nbsp;
![gzip size](https://img.badgesize.io/https:/unpkg.com/ahooks@next/dist/ahooks.js?label=gzip%20size&compression=gzip)
&nbsp;
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
$ npm install --save ahooks@next
# or
$ yarn add ahooks@next
```

## 🔨 使用

```js
import { useRequest } from 'ahooks';
```

## 💻 在线体验

[![Edit demo for ahooks](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/demo-for-ahooks-forked-fg79k?file=/src/App.js)

## 🤝 参与共建

```bash
$ git clone git@github.com:alibaba/hooks.git
$ cd hooks
$ yarn run init
$ yarn start
```

打开浏览器访问 http://127.0.0.1:8000

我们欢迎所有人参与共建，请参考[CONTRIBUTING.MD](https://github.com/alibaba/hooks/blob/master/CONTRIBUTING.zh-CN.md)

感谢所有贡献者：

<a href="https://github.com/alibaba/hooks/graphs/contributors">
  <img src="https://opencollective.com/ahooks/contributors.svg?width=960&button=false" alt="contributors" />
</a>

## 👥 交流讨论

<img src="https://user-images.githubusercontent.com/12526493/141303172-68f25577-c7b7-4ff7-bdff-25fd0f4d5214.JPG" width="300" />

[1]: https://www.npmjs.com/package/ahooks
[2]: https://npmjs.org/package/ahooks
[image-1]: https://img.shields.io/npm/v/ahooks.svg?style=flat
[image-2]: https://img.shields.io/npm/dm/ahooks.svg?style=flat
