---
title: v3 to v4
order: 1
toc: content
demo:
  cols: 2
---

This document will help you upgrade from version 3.x of ahooks to version 4.x. If you are using version 2.x or older, please refer to the previous [upgrade document](https://ahooks-v3.js.org/zh-CN/guide/upgrade) to upgrade to 3.x first.

## Upgrade Recommendations

- If your project has not used ahooks before, directly use the latest version of ahooks v4.
- If ahooks is already installed in your project and you do not want to disrupt the existing code logic, you can transition to the upgrade through [coexistence of multiple versions](#coexistence-of-multiple-versions).
- If ahooks is already installed in your project and you have time to handle incompatible changes, you can refer to [incompatible changes in v4](#incompatible-changes-in-v4) for disruptive upgrade.

## Incompatible Changes in v4

<!-- TODO: Developers, please update this document after introducing breaking changes. -->

## Coexistence of Multiple Versions

You can install v4 via alias to achieve coexistence of multiple versions for a transitional upgrade. It should be noted that not all package managers have good support for npm aliases.

```bash
$ npm install ahooks4@npm:ahooks@4 --save
# or
$ yarn add ahooks4@npm:ahooks@4
# or
$ pnpm add ahooks4@npm:ahooks@4
# or
$ bun add ahooks4@npm:ahooks@4
```

The package.json will be:

```json
{
  "ahooks": "3.x",
  "ahooks4": "npm:ahooks@4"
}
```

Now, ahooks in your project is still v4, and ahooks4 is v5:

```tsx
import React from 'react';
import { useRequest } from 'ahooks'; // v3
import { useRequest } from 'ahooks4'; // v4
```

This way, you can use the capabilities of the new version of ahooks v4 without introducing incompatible changes.

## Encounter problems

If you encounter problems during the upgrade, please go to [GitHub issues](https://github.com/alibaba/hooks/issues) for feedback. We will respond and improve this document as soon as possible.
