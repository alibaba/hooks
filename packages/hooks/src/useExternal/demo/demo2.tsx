/**
 * title: Load style dynamically
 * desc: Load a css file to your page such as [bootstrap-badge.css](/useExternal/bootstrap-badge.css)
 *
 * title.zh-CN: 动态加载样式
 * desc.zh-CN: 页面上加载外部 css 文件，例如引入 [bootstrap-badge.css](/useExternal/bootstrap-badge.css)
 */

import React from 'react';
import { useExternal } from 'ahooks';

export default () => {
  const [status, { toggle, load, unload }] = useExternal('/useExternal/bootstrap-badge.css', {
    media: 'all',
  });

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
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
      <button type="button" style={{ marginRight: 8 }} onClick={() => toggle()}>
        toggle
      </button>
      <button type="button" style={{ marginRight: 8 }} onClick={() => unload()}>
        unload
      </button>
      <button type="button" style={{ marginRight: 8 }} onClick={() => load()}>
        load
      </button>
    </>
  );
};
