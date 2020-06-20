---
order: 1
nav:
  title: Guide
  order: 1
---

# Getting Started

ahooks is a React Hooks library dedicated to providing commonly used and high quality Hooks.

> Before start, you need to know the basic usage of React and React Hooks. Follow the [link](https://reactjs.org/docs/hooks-intro.html) to learn the official React Hooks documentation.


## First Example

Here is a simple codesandbox example to show the usage of ahooks.


<code src="./demo.tsx" inline />

### 1. Create one codesandbox

Visit https://codesandbox.io/s/ahooks-template-k5l7x to create a codesandbox. Don't forget to press the save button.

### 2. Using ahooks

Replace the content of App.js with the following code, use the [useToggle](/state/use-toggle) of ahooks.

```javascript
import React from "react";
import { useToggle } from "ahooks";

export default () => {
  const [ state, { toggle } ] = useToggle();

  return (
    <div>
      <p>Current Boolean: {String(state)}</p>
      <p>
        <button onClick={() => toggle()}>Toggle</button>
      </p>
    </div>
  );
};
```

### 3. Explore more Hooks

You can look up Hooks in the side menu like useRequest, useHover etc. Our document provides a variety of examples, you can click the icon in the lower right corner to view the code. At the same time, the Hooks API can be consulted at the bottom of the document. Go and try it.

## Import on demand

we can import individual Hooks on demand。

```javascript
import useToggle from 'ahooks/es/useToggle';
```

> Note: ahooks supports ES6 tree shaking, so `import { useToggle } from 'ahooks'` will drop the js code you don't use too.

We strongly recommend using [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), which can convert the following code to the `import useToggle from 'ahooks/es/useToggle'` way:

```javascript
import { useToggle } from 'ahooks';
```
