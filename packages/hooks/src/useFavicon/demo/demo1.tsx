/**
 * title: Basic usage
 * desc: Page favicon setup or toggle
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 页面标识favicon设置与切换
 */

import React, { useState } from 'react';
import { useFavicon } from 'ahooks';

export const DEFAULT_FAVICON_URL = 'https://ahooks.js.org/simple-logo.svg';

export const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico';

export default () => {
  const [url, setUrl] = useState<string>(DEFAULT_FAVICON_URL);

  useFavicon(url);

  return (
    <>
      <p>
        当前Favicon: <span>{url}</span>
      </p>
      <button
        id="google"
        style={{ marginRight: 16 }}
        onClick={() => {
          setUrl(GOOGLE_FAVICON_URL);
        }}
      >
        Change To Google Favicon
      </button>
      <button
        id="ahooks"
        onClick={() => {
          setUrl(DEFAULT_FAVICON_URL);
        }}
      >
        Back To AHooks Favicon
      </button>
    </>
  );
};
