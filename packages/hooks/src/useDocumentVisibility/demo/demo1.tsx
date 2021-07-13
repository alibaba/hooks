/**
 * title: Default usage
 * desc: Listen to document visibility change.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 监听 document 的可见状态
 */

import React, { useEffect } from 'react';
import { useDocumentVisibility } from 'ahooks';

export default () => {
  const documentVisibility = useDocumentVisibility();

  useEffect(() => {
    console.log(`Current document visibility state: ${documentVisibility}`);
  }, [documentVisibility]);

  return <div>Current document visibility state: {documentVisibility}</div>;
};
