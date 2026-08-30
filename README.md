<p align="center">
  <a href="https://ahooks.js.org">
    <img width="200" src="https://ahooks.js.org/logo.svg">
  </a>
</p>

<div align="center">

A high-quality & reliable React Hooks library.

[![NPM version][image-1]][1]
[![NPM downloads][image-2]][2]
[![npm](https://img.shields.io/npm/dw/ahooks-v2?label=downloads%28v2%29)](https://www.npmjs.com/package/ahooks-v2)
[![npm](https://img.shields.io/github/issues/alibaba/hooks)](https://github.com/alibaba/hooks/issues)
[![Coverage Status](https://coveralls.io/repos/github/alibaba/hooks/badge.svg?branch=master)](https://coveralls.io/github/alibaba/hooks?branch=master)
![gzip size](https://img.badgesize.io/https:/unpkg.com/ahooks/dist/ahooks.js?label=gzip%20size&compression=gzip)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/alibaba/hooks.svg)](http://isitmaintained.com/project/alibaba/hooks "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/alibaba/hooks.svg)](http://isitmaintained.com/project/alibaba/hooks "Average time to resolve an issue")
![GitHub](https://img.shields.io/github/license/alibaba/hooks)

English | [简体中文](https://github.com/alibaba/hooks/blob/master/README.zh-CN.md)

</div>

## 📚 Documentation

- [English](https://ahooks.js.org/)
- [中文](https://ahooks.js.org/zh-CN/)

> Notice
>
> `use-url-state` is now published as `@ahooks.js/use-url-state`.
>
> If you are installing or upgrading this package, please use the new package name.

## ✨ Features

- Easy to learn and use
- Supports SSR
- Special treatment for functions, avoid closure problems
- Contains a large number of advanced Hooks that are refined from business scenarios
- Contains a comprehensive collection of basic Hooks
- Written in TypeScript with predictable static types

## 📦 Install

```bash
$ npm install --save ahooks
# or
$ yarn add ahooks
# or
$ pnpm add ahooks
# or
$ bun add ahooks
```

## 🔨 Usage

```ts
import { useRequest } from "ahooks";
```

## 💻 Online Demo

[![Edit demo for ahooks](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/demo-for-ahooks-forked-fg79k?file=/src/App.js)

## 🤝 Contributing

```bash
$ git clone git@github.com:alibaba/hooks.git
$ cd hooks
$ pnpm run init
$ pnpm start
```

Open your browser and visit http://127.0.0.1:8000

We welcome all contributions, please read our [CONTRIBUTING.MD](https://github.com/alibaba/hooks/blob/master/CONTRIBUTING.MD) first, let's build a better hooks library together.

Thanks to all the contributors:

<a href="https://github.com/alibaba/hooks/graphs/contributors">
  <img src="https://opencollective.com/ahooks/contributors.svg?width=960&button=false" alt="contributors" />
</a>

## 👥 Discuss

<img alt="ahooks discussion group 1" draggable="false" src="https://github.com/user-attachments/assets/dda464be-26cf-4c83-8fee-16862fb916cb" width="200" style='display:inline' />
<img alt="ahooks discussion group 2" draggable="false" src="https://github.com/user-attachments/assets/c804a026-3b07-4a20-ad7e-83cf2f86bc9a" width="200" style='display:inline' />
<img alt="ahooks discussion group 3" draggable="false" src="https://github.com/user-attachments/assets/52ac8ef8-6506-4540-a17d-823ae4371b88" width="200" style='display:inline' />

[1]: https://www.npmjs.com/package/ahooks
[2]: https://npmjs.org/package/ahooks
[image-1]: https://img.shields.io/npm/v/ahooks.svg?style=flat
[image-2]: https://img.shields.io/npm/dw/ahooks.svg?style=flat
