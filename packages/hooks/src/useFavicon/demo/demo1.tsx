/**
 * title: Basic usage
 * desc: Set favicon
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 设置 favicon
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
        Current Favicon: <span>{url}</span>
      </p>
      <button
        style={{ marginRight: 16 }}
        onClick={() => {
          setUrl(GOOGLE_FAVICON_URL);
        }}
      >
        Change To Google Favicon
      </button>
      <button
        onClick={() => {
          setUrl(DEFAULT_FAVICON_URL);
        }}
      >
        Back To AHooks Favicon
      </button>
    </>
  );
};
