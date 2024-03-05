/**
 * title: Basic usage
 * description: Set favicon
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 设置 favicon
 */

import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useFavicon } from 'ahooks';

export const DEFAULT_FAVICON_URL = 'https://ahooks.js.org/simple-logo.svg';
export const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico';

export default () => {
  const [url, setUrl] = useState<string>(DEFAULT_FAVICON_URL);

  useFavicon(url);

  return (
    <Space direction="vertical">
      <p>
        Current Favicon: <span>{url}</span>
      </p>
      <Space>
        <Button onClick={() => setUrl(GOOGLE_FAVICON_URL)}>Change To Google Favicon</Button>
        <Button onClick={() => setUrl(DEFAULT_FAVICON_URL)}>Back To ahooks Favicon</Button>
      </Space>
    </Space>
  );
};
