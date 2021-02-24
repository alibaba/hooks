/**
 * title: Input a variable
 * desc: Randomly generate the URL address and input the useExternal
 *
 * title.zh-CN: 传入一个变量
 * desc.zh-CN: 随机生成 url 地址并传入 useExternal
 */

import React from 'react';
import { useExternal } from 'ahooks';

export default () => {
  const ref = React.useRef();

  const [path, setPath] = React.useState('https://picsum.photos/200/100');

  const [status] = useExternal(path, {
    type: 'img',
    target: ref
  });

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
      <button
        type="button"
        style={{ marginRight: 8 }}
        onClick={() =>
          setPath(`https://picsum.photos/200/100?random=${Math.floor(Math.random() * 100)}`)
        }
      >
        random a path
      </button>
      <br />
      <br />
      <a href={path} target="_blank">
        {path}
      </a>
      <br />
      <div ref={ref}></div>
    </>
  );
};
