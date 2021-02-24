/**
 * title: Default usage
 * desc: Load a javascript file to your page such as [test-external-script.js](/useExternal/test-external-script.js)
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 页面上加载外部 javascript 文件，例如引入 [test-external-script.js](/useExternal/test-external-script.js)
 */

import React from 'react';
import { useExternal } from 'ahooks';

export default () => {
  const [status, { toggle, load, unload }] = useExternal('/useExternal/test-external-script.js', {
    async: false,
  });

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
      <p>
        Response: <i>{status === 'ready' ? TEST_SCRIPT?.start() : '-'}</i>
      </p>
      <button type="button" style={{ marginRight: 8 }} onClick={() => toggle()}>
        toggle
      </button>
      <button type="button" style={{ marginRight: 8 }} onClick={() => { 
        unload();
        // Maybe you wanna remove the global variables or functions after run unload()
        TEST_SCRIPT = undefined;
      }}>
        unload
      </button>
      <button type="button" style={{ marginRight: 8 }} onClick={() => load()}>
        load
      </button>
    </>
  );
};
