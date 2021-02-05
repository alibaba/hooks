/**
 * title: Return all parameter
 * desc: Return all parameter of the DOM element.
 *
 * title.zh-CN: 返回所有坐标系数
 * desc.zh-CN: 返回 dom 元素上的所有坐标系数
 */

import React, { useState } from 'react';
import { useSize } from 'ahooks';

export default () => {
  const ref = React.useRef();
  const [observe, setObserve] = useState(true);
  const size = useSize(ref, { observe });
  return (
    <div>
      <button onClick={() => setObserve(!observe)}>{observe ? 'Stop' : 'Start'} observing</button>
      <pre>{JSON.stringify(size, null, 2)}</pre>
      <div
        ref={ref}
        contentEditable
        style={{
          display: 'inline-block',
          padding: 10,
          border: '1px solid',
        }}
        dangerouslySetInnerHTML={{
          __html: 'Edit this to change the size!',
        }}
      />
    </div>
  );
};
