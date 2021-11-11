# React Hooks & strict mode

## What is strict mode

In React, there are many historical APIs or writing methods that will be obsolete in future versions and are now marked as deprecated. such as `componentWillMount`, in normal mode, you can use it normally. But in strict mode, a warning will be thrown:

![image.png](https://user-images.githubusercontent.com/12526493/140928679-cafd5b58-2937-41a9-87e8-f68aa6d978d9.png)

So **strict mode is for future development, all APIs or writing methods that are not recommended will throw warnings (only effective in development mode).**

We can use `React.StrictMode` to enable strict mode.

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

For more documents, please refer to "[Strict Mode](https://zh-hans.reactjs.org/docs/strict-mode.html)"

## Points to note in React Hooks

One of the most important capabilities of strict mode is "[Detecting Unexpected Side Effects](https://zh-hans.reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)", in the future concurrent mode, the component is divided into two stages:

- **Render phase**: Generate dom tree, will execute constructor, componentWillMount, componentWillReceiveProps, componentWillUpdate, getDerivedStateFromProps, shouldComponentUpdate, render, **useState, useMemo, useCallback** and other life cycles
- **Commit stage**: Commit dom, trigger componentDidMount, componentDidUpdate, **useEffect** and other life cycles

Generally, the render phase is time-consuming, and the commit phase is executed quickly. Therefore, in the future concurrent mode, the render phase may be suspended and re-executed. That is, the life cycle of the rendering phase may be executed multiple times.

```javascript
constructor(){
  services.getUserInfo().then(()=>{
    .....
  });
}
```

As above, if we initiate a network request in the constructor, it may be executed multiple times. So **do not perform operations with side effects during the render phase.**

But if you perform side-effect operations during the rendering phase, React will not be able to perceive it. **But in strict mode, React will deliberately repeat the render phase method, making it easier for us to find such bugs in the development phase** (not all the life cycles of the rendering phase will be re-executed, see [Official Documentation](https://zh-hans.reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)).

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

In the above code, the first parameter of useState, useMemo, and function body are all executed twice.

Please remember the conclusion: **In strict mode, the first parameter of useState, useMemo, useReduder, and function body will be executed twice. Do not perform operations with side effects here.**
