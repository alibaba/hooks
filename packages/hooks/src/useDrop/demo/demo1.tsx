/**
 * title: Default usage
 * desc: The drop area can accept files, uri, text or one of the boxes below.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 拖拽区域可以接受文件，链接，文字，和下方的 box 节点。
 */

import React, { useState } from 'react';
import { message } from 'antd';
import { useDrop, useDrag } from '@umijs/hooks';

export default () => {
  const getDragProps = useDrag();
  const [ props, { isHovering } ] = useDrop({
    onText: (text, e) => {
      console.log(e);
      message.success(`'text: ${text}' dropped`);
    },
    onFiles: (files, e) => {
      console.log(e, files);
      message.success(`${files.length} file dropped`);
    },
    onUri: (uri, e) => {
      console.log(e);
      message.success(`uri: ${uri} dropped`);
    },
    onDom: (content: string, e) => {
      message.success(`custom: ${content} dropped`)
    }
  });

  return (
    <div>
      <div style={{ border: '1px dashed #e8e8e8', padding: 16, textAlign: 'center' }} {...props}>
        { isHovering ? 'release here' : 'drop here' }
      </div>

      <div style={{ display: 'flex', marginTop: 8 }}>
        {
          Array.from(Array(5)).map((e, i) => (
            <div
              {...getDragProps(`box${i}`)}
              style={{ border: '1px solid #e8e8e8', padding: 16, width: 80, textAlign: 'center', marginRight: 16 }}
            >
              box{i}
            </div>
          ))
        }
      </div>
    </div>
  );
};
