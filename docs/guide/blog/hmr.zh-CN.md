# React Hooks & react-refresh（HMR）

## 什么是 react-refresh

[react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) 是 React 官方提供的一个 模块热替换（HMR）插件。

> A Webpack plugin to enable "Fast Refresh" (also previously known as Hot Reloading) for React components.

在开发环境编辑代码时，react-refresh 可以保持组件当前状态，仅仅变更编辑的部分。在 [umi](https://umijs.org/zh-CN/docs/fast-refresh) 中可以通过 `fastRefresh: {}`快速开启该功能。

![fast-refresh.gif](https://camo.githubusercontent.com/244b53f735f2a78cfbce79a3914600840cdedac545e5f309d32ac7be4fdb2517/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303631353937363932382d33633832353564642d396165342d343933342d613833322d3965643934636565353762632e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753234363633316564266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d666173742d726566726573682e676966266f726967696e4865696768743d363136266f726967696e57696474683d31303030266f726967696e616c547970653d62696e6172792673697a653d35313534393234267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7565316263613762312d393035362d343431392d613438382d6231393365366236643936)

这张 gif 动图展示的是使用 react-refresh 特性的开发体验，可以看出，修改组件代码后，已经填写的用户名和密码保持不变，仅仅只有编辑的部分变更了。

## react-refresh 的简单原理

对于 Class 类组件，react-refresh 会一律重新刷新（remount），已有的 state 会被重置。而对于函数组件，react-refresh 则会保留已有的 state。所以 react-refresh 对函数类组件体验会更好。
本篇文章主要讲解 React Hooks 在 react-refresh 模式下的怪异行为，现在我来看下 react-refresh 对函数组件的工作机制。

- 在热更新时为了保持状态，`useState` 和 `useRef` 的值不会更新。
- 在热更新时，[为了解决某些问题](https://github.com/facebook/react/issues/21019#issuecomment-800650091)，`useEffect`、`useCallback`、`useMemo` 等会重新执行。

> When we update the code, we need to "clean up" the effects that hold onto past values (e.g. passed functions), and "setup" the new ones with updated values. Otherwise, the values used by your effect would be stale and "disagree" with value used in your rendering, which makes Fast Refresh much less useful and hurts the ability to have it work with chains of custom Hooks.

![Kapture 2021-05-10 at 11.37.54.gif](https://camo.githubusercontent.com/d9452c7cb9035fd422d9be908d1815ad25f0ca496d938fc3962d317c6d29fc61/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303631383030393232392d63656261323438342d656430612d343336392d393731612d3636353931383933313238642e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753737313339373665266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d4b617074757265253230323032312d30352d3130253230617425323031312e33372e35342e676966266f726967696e4865696768743d383736266f726967696e57696474683d31323534266f726967696e616c547970653d62696e6172792673697a653d31373038383131267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7561343663386239322d656234342d343862372d383634352d3738323232623438646464)

如上图所示，在文本修改之后，`state` 保持不变，`useEffect` 被重新执行了。

## react-refresh 工作机制导致的问题

在上述工作机制下，会带来很多问题，接下来我会举几个具体的例子。

### 第一个问题

```js
import React, { useEffect, useState } from 'react';

export default () => {
  const [count, setState] = useState(0);

  useEffect(() => {
    setState((s) => s + 1);
  }, []);

  return <div>{count}</div>;
};
```

上面的代码很简单，在正常模式下，`count`值最大为 `1`。因为 `useEffect` 只会在初始化的时候执行一次。
但在 react-refresh 模式下，每次热更新的时候，`state` 不变，但 `useEffect` 重新执行，就会导致 `count` 的值一直在递增。

![Kapture 2021-05-10 at 12.09.47.gif](https://camo.githubusercontent.com/82528f255af3a88133d66824de55dd1f6e665030caf0bae81291951d5fe75943/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303631393831313739312d34383161323862302d396262642d343938302d626635322d3731313561633336363262352e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753263313732313030266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d4b617074757265253230323032312d30352d3130253230617425323031322e30392e34372e676966266f726967696e4865696768743d383736266f726967696e57696474683d31323534266f726967696e616c547970653d62696e6172792673697a653d31333532383932267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7533346432653861302d333430642d346638632d383039302d6232346638303433623266)

如上图所示，`count` 随着每一次热更新在递增。

### 第二个问题

如果你使用了 [ahooks v2](https://github.com/alibaba/hooks/blob/release/v2.x/packages/hooks/src/useUpdateEffect/index.ts) 或者 [react-use](https://github.com/streamich/react-use/blob/master/docs/useUpdateEffect.md) 的 `useUpdateEffect`，在热更新模式下也会有不符合预期的行为。

```javascript
import React, { useEffect } from 'react';
import useUpdateEffect from './useUpdateEffect';

export default () => {
  useEffect(() => {
    console.log('执行了 useEffect');
  }, []);

  useUpdateEffect(() => {
    console.log('执行了 useUpdateEffect');
  }, []);

  return <div>hello world</div>;
};
```

`useUpdateEffect` 与 `useEffect`相比，它会忽略第一次执行，只有在 deps 变化时才会执行。以上代码的在正常模式下，`useUpdateEffect` 是永远不会执行的，因为 deps 是空数组，永远不会变化。
但在 react-refresh 模式下，热更新时，`useUpdateEffect` 和 `useEffect` 同时执行了。

![Kapture 2021-05-10 at 12.26.19.gif](https://camo.githubusercontent.com/18000e2859234c5ca4d7613985dab82cba0a654cca53a9df5bc63dfcd126cce7/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303632303739373138392d36613561366434302d616637372d343339642d616462632d3230666430343664636663302e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753065323737343631266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d4b617074757265253230323032312d30352d3130253230617425323031322e32362e31392e676966266f726967696e4865696768743d383736266f726967696e57696474683d31323534266f726967696e616c547970653d62696e6172792673697a653d373937383135267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7564613336343363622d386435312d346437322d626461322d3362333431353762313530)

造成这个问题的原因，就是 `useUpdateEffect` 用 `ref` 来记录了当前是不是第一次执行，见下面的代码。

```javascript
import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
```

上面代码的关键在 `isMounted`

- 初始化时，`useEffect` 执行，标记 `isMounted` 为 `true`
- 热更新后，`useEffect` 重新执行了，此时 `isMounted` 为 `true`，就往下执行了

### 第三个问题

最初发现这个问题，是 ahooks 的 `useRequest` 在热更新后，`loading` 会一直为 `true`。经过分析，原因就是使用 `isUnmount` ref 来标记组件是否卸载。

```javascript
import React, { useEffect, useState } from 'react';

function getUsername() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('test');
    }, 1000);
  });
}

export default function IndexPage() {
  const isUnmount = React.useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUsername().then(() => {
      if (isUnmount.current === false) {
        setLoading(false);
      }
    });
    return () => {
      isUnmount.current = true;
    };
  }, []);

  return loading ? <div>loading</div> : <div>hello world</div>;
}
```

如上代码所示，在热更新时，`isUnmount.current` 变为了 `true`，导致二次执行时，代码以为组件已经卸载了，不再响应异步操作。

## 如何解决这些问题

### 方案一

第一个解决方案是从代码层面解决，也就是要求我们在写代码的时候，时时能想起来 react-refresh 模式下的怪异行为。
比如 `useUpdateEffect` 我们就可以在初始化或者热替换时，将 `isMounted` ref 初始化掉。如下：

```diff
import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(false);

+  useEffect(() => {
+  	isMounted.current = false;
+  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
```

这个方案对上面的问题二和三都是有效的。

### 方案二

根据[官方文档](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md#reset)，我们可以通过在文件中添加以下注释来解决这个问题。

```javascript
/* @refresh reset */
```

添加这个问题后，每次热更新，都会 remount，也就是组件重新执行。`useState` 和 `useRef` 也会重置掉，也就不会出现上面的问题了。

## 官方态度

本来 React Hooks 已经有蛮多潜规则了，在使用 react-refresh 时，还有潜规则要注意。但官方回复说这是预期行为，见该 [issue](https://github.com/facebook/react/issues/21019)。

> Effects are not exactly "mount"/"unmount" — they're more like "show"/"hide".
