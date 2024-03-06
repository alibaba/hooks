/**
 * title: Load style dynamically
 * description: Load css file, such as [bootstrap-badge.css](/useExternal/bootstrap-badge.css)
 *
 * title.zh-CN: 动态加载样式
 * description.zh-CN: 加载 css 文件，例如引入 [bootstrap-badge.css](/useExternal/bootstrap-badge.css)
 */

import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useExternal } from 'ahooks';

export default () => {
  const [path, setPath] = useState('/useExternal/bootstrap-badge.css');
  const status = useExternal(path);

  return (
    <Space direction="vertical">
      <p>
        Status: <b>{status}</b>
      </p>
      <Space wrap>
        <span className="badge badge-pill badge-primary">Primary</span>
        <span className="badge badge-pill badge-secondary">Secondary</span>
        <span className="badge badge-pill badge-success">Success</span>
        <span className="badge badge-pill badge-danger">Danger</span>
        <span className="badge badge-pill badge-warning">Warning</span>
        <span className="badge badge-pill badge-info">Info</span>
        <span className="badge badge-pill badge-light">Light</span>
        <span className="badge badge-pill badge-dark">Dark</span>
      </Space>
      <Space wrap>
        <Button onClick={() => setPath('')}>unload</Button>
        <Button onClick={() => setPath('/useExternal/bootstrap-badge.css')}>load</Button>
      </Space>
    </Space>
  );
};
