/**
 * title: Load style dynamically
 * desc: Load css file, such as [bootstrap-badge.css](/useExternal/bootstrap-badge.css)
 *
 * title.zh-CN: 动态加载样式
 * desc.zh-CN: 加载 css 文件，例如引入 [bootstrap-badge.css](/useExternal/bootstrap-badge.css)
 */

import { useExternal } from 'ahooks';
import React, { useState } from 'react';

export default () => {
  const [path, setPath] = useState('');
  const status = useExternal(path);

  const [path2, setPath2] = useState('');
  const status2 = useExternal(path2);

  return (
    <>
      <div className="bd-example">
        <span className="badge badge-pill badge-primary">Primary</span>
        <span className="badge badge-pill badge-secondary">Secondary</span>
        <span className="badge badge-pill badge-success">Success</span>
        <span className="badge badge-pill badge-danger">Danger</span>
        <span className="badge badge-pill badge-warning">Warning</span>
        <span className="badge badge-pill badge-info">Info</span>
        <span className="badge badge-pill badge-light">Light</span>
        <span className="badge badge-pill badge-dark">Dark</span>
      </div>
      <br />

      <h1>第一个</h1>
      <p>
        Status: <b>{status}</b>
      </p>
      <button type="button" style={{ marginRight: 8 }} onClick={() => setPath('')}>
        unload
      </button>
      <button
        type="button"
        style={{ marginRight: 8 }}
        onClick={() => setPath('/useExternal/bootstrap-badge.css')}
      >
        load
      </button>
      <hr />
      <h1>第二个</h1>
      <p>
        Status: <b>{status2}</b>
      </p>
      <button type="button" style={{ marginRight: 8 }} onClick={() => setPath2('')}>
        unload
      </button>
      <button
        type="button"
        style={{ marginRight: 8 }}
        onClick={() => setPath2('/useExternal/bootstrap-badge.css')}
      >
        load
      </button>
    </>
  );
};
