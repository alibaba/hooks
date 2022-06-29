# React Hooks & strict mode

## 什么是严格模式

在 React 中，有很多历史的 API 或写法，在未来版本中会被废弃，现在被标记为不建议使用。既然是不建议使用，那还是可以用的，比如 `componentWillMount`，在普通模式下，你可以正常使用。但在严格模式下，就会抛出警告：

![image.png](https://user-images.githubusercontent.com/12526493/140928679-cafd5b58-2937-41a9-87e8-f68aa6d978d9.png)

所以**严格模式就是面向未来开发，所有不建议的 API 或写法，都会抛出警告（只在开发模式生效）。**

一般我们可以通过 `React.StrictMode` 来局部启用严格模式。

```javascript
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

更多文档参考《[严格模式](https://zh-hans.reactjs.org/docs/strict-mode.html)》

## 在 React Hooks 中需要注意的点

严格模式很重要的一个能力是《[检测意外的副作用](https://zh-hans.reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)》，在未来的 concurrent 模式中，组件被分为两个阶段：

- **渲染（render）阶段**：生成 DOM 树，会执行 constructor、componentWillMount、componentWillReceiveProps、componentWillUpdate、getDerivedStateFromProps、shouldComponentUpdate、render、**useState、useMemo、useCallback** 等生命周期
- **提交（commit）阶段**：操作 DOM，触发 componentDidMount、componentDidUpdate、**useEffect** 等生命周期

一般渲染阶段会比较耗时，提交阶段执行很快。所以在未来的 concurrent 模式中，渲染阶段可能会被暂停、重新执行。也就是渲染阶段的生命周期，可能会被多次执行。

```javascript
constructor(){
  services.getUserInfo().then(() => {
    .....
  });
}
```

如上，我们在 constructor 中发起网络请求，就可能被执行多次。所以**不要在渲染阶段执行带有副作用的操作。**

但假如你在渲染阶段执行了副作用操作，React 也是无法感知的。**但是 React 在严格模式下，会故意重复执行渲染阶段的方法，使得我们在开发阶段能更容易发现这类 bug**（并不是所有渲染阶段的生命周期都会被重新执行，具体见[官方文档](https://zh-hans.reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)）。

```javascript
const useTest = () => {
  const [state, setState] = useState(() => {
    console.log('get state');
    return 'state';
  });

  const memoState = useMemo(() => {
    console.log('get memo state');
    return 'state';
  }, []);

  console.log('render');

  return state;
};
```

在上面的代码中 `useState`、`useMemo` 的第一个参数、Hook 函数体均执行了两次。

[在线体验](https://codesandbox.io/s/xvv55893mp?file=/src/index.js)

请记住结论：**在严格模式下，`useState`、`useMemo`、`useReducer` 的第一个参数、Hook 函数体都会被执行两次，不要在这里执行带有副作用的操作。**
