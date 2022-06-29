# React Hooks & react-refresh（HMR）

## What is react-refresh?

[react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) is a hot module replacement (HMR) plugin provided by React.

> A Webpack plugin to enable "Fast Refresh" (also previously known as Hot Reloading) for React components.

In the development, react-refresh can keep state in component, and only change the edited part. In [umi](https://umijs.org/zh-CN/docs/fast-refresh), can enable this feature by config `fastRefresh: {}`.

![fast-refresh.gif](https://camo.githubusercontent.com/244b53f735f2a78cfbce79a3914600840cdedac545e5f309d32ac7be4fdb2517/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303631353937363932382d33633832353564642d396165342d343933342d613833322d3965643934636565353762632e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753234363633316564266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d666173742d726566726573682e676966266f726967696e4865696768743d363136266f726967696e57696474683d31303030266f726967696e616c547970653d62696e6172792673697a653d35313534393234267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7565316263613762312d393035362d343431392d613438382d6231393365366236643936)

This gif shows the development experience of using the react-refresh. After edit some code, the username and password that have been filled in remain unchanged, only the edited part has been changed.

## Simple Principles of react-refresh

For the Class component, react-refresh are always refresh (remount), existing state will be reset. For function components, react-refresh retains the existing state. Therefore, react-refresh provides a better experience for function components.

This article mainly explains the weird behavior of React Hooks in react-refresh mode. Now let us look at the working mechanism of react-refresh on function components.

- To maintain the state during hot replacement, the value of `useState` and `useRef` will not update.
- During hot replacement, [To avoid some problems](<(https://github.com/facebook/react/issues/21019#issuecomment-800650091)>), `useEffect`、`useCallback`、`useMemoRun` will re-executed.

> When we update the code, we need to "clean up" the effects that hold onto past values (e.g. passed functions), and "setup" the new ones with updated values. Otherwise, the values used by your effect would be stale and "disagree" with value used in your rendering, which makes Fast Refresh much less useful and hurts the ability to have it work with chains of custom Hooks.

![Kapture 2021-05-10 at 11.37.54.gif](https://camo.githubusercontent.com/d9452c7cb9035fd422d9be908d1815ad25f0ca496d938fc3962d317c6d29fc61/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303631383030393232392d63656261323438342d656430612d343336392d393731612d3636353931383933313238642e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753737313339373665266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d4b617074757265253230323032312d30352d3130253230617425323031312e33372e35342e676966266f726967696e4865696768743d383736266f726967696e57696474683d31323534266f726967696e616c547970653d62696e6172792673697a653d31373038383131267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7561343663386239322d656234342d343862372d383634352d3738323232623438646464)

As shown in the gif, after the text is modified, `state` remains unchanged and `useEffect` is executed again.

## Problem caused by react-refresh

Under the above working mechanism, there will be many problems. Next, I will give a few specific examples.

### First problem

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

The above code is very simple. In normal mode, the maximum value of `count` is `1`. Because `useEffect` will only be executed once during initialization.

But in the react-refresh mode, the `state` does not change every time it is hot updated, but the re-execution of `useEffect` will cause the value of `count` to keep increasing.

![Kapture 2021-05-10 at 12.09.47.gif](https://camo.githubusercontent.com/82528f255af3a88133d66824de55dd1f6e665030caf0bae81291951d5fe75943/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303631393831313739312d34383161323862302d396262642d343938302d626635322d3731313561633336363262352e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753263313732313030266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d4b617074757265253230323032312d30352d3130253230617425323031322e30392e34372e676966266f726967696e4865696768743d383736266f726967696e57696474683d31323534266f726967696e616c547970653d62696e6172792673697a653d31333532383932267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7533346432653861302d333430642d346638632d383039302d6232346638303433623266)

As shown in the gif, `count` increases with each hot replacement.

### Second problem

If you used [ahooks v2](https://github.com/alibaba/hooks/blob/release/v2.x/packages/hooks/src/useUpdateEffect/index.ts) or [react-use](https://github.com/streamich/react-use/blob/master/docs/useUpdateEffect.md) `useUpdateEffect` will also have unexpected behavior in HMR.

```javascript
import React, { useEffect } from 'react';
import useUpdateEffect from './useUpdateEffect';

export default () => {
  useEffect(() => {
    console.log('useEffect');
  }, []);

  useUpdateEffect(() => {
    console.log('useUpdateEffect');
  }, []);

  return <div>hello world</div>;
};
```

Compared with `useEffect`, `useUpdateEffect` ignores the first execution and only executes when the deps changes. In the normal mode of the above code, `useUpdateEffect` will never be executed, because deps is an empty array and will never change.
But in react-refresh mode, during HMR, `useUpdateEffect` and `useEffect` are executed at the same time.

![Kapture 2021-05-10 at 12.26.19.gif](https://camo.githubusercontent.com/18000e2859234c5ca4d7613985dab82cba0a654cca53a9df5bc63dfcd126cce7/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303632303739373138392d36613561366434302d616637372d343339642d616462632d3230666430343664636663302e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753065323737343631266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d4b617074757265253230323032312d30352d3130253230617425323031322e32362e31392e676966266f726967696e4865696768743d383736266f726967696e57696474683d31323534266f726967696e616c547970653d62696e6172792673697a653d373937383135267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7564613336343363622d386435312d346437322d626461322d3362333431353762313530)

The reason for this problem is that `useUpdateEffect` uses `ref` to record whether it is currently executed for the first time, see the code below.

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

The key of the above code is `isMounted`.

- During initialization, after the `useEffect` is executed, the `isMounted` is changed to `true`
- After the HMR, when the `useEffect` is re-executing, because the `isMounted` is already `true`, so the whole effect is executed again.

### Third problem

The first time discovered this problem is the `useRequest` of ahooks, after HMR, the `loading` would always be `true`. After an inspection, the reason is use the `isUnmount` ref to mark whether the component is unmount.

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

As the code above, during the hot replacement, `isUnmount.current` becomes `true`, causing the code to think that the component has been unmounted during the second execution.

## How to solve these problems

### First solution

The first solution is to solve it from the code, that is, when we write code, we can always remember the weird behavior in react-refresh mode.

For example, with `useUpdateEffect`, we can initialize the `isMounted` ref during initialization or hot replacement. as follows:

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

This solution is effective for both questions 2 and 3 above.

### Second solution

According to [Official Document](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md#reset), we can solve this problem by adding the following comment in the file .

```javascript
/* @refresh reset */
```

After adding this question, every hot replacement will remount, that is, the component will be re-executed. `useState` and `useRef` will also be reset, so the above problem will not occur.

## Official attitude

There are already many unspoken rules for React Hooks. When using react-refresh, there are still unspoken rules to pay attention to. But the official reply stated that this is expected behavior, see the [issue](https://github.com/facebook/react/issues/21019).

> Effects are not exactly "mount"/"unmount" — they're more like "show"/"hide".
