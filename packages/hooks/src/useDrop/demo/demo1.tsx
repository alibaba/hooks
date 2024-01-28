/**
 * title: Basic usage
 * desc: The drop area can accept files, uri, text or one of the boxes below.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 拖拽区域可以接受文件，链接，文字，和下方的 box 节点。
 */

import React, { useRef, useState } from 'react';
import { useDrop, useDrag } from 'ahooks';

const DragItem = ({ data }) => {
  const dragRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  useDrag(data, dragRef, {
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(false);
    },
  });

  return (
    <div
      ref={dragRef}
      style={{
        border: '1px solid #e8e8e8',
        padding: 16,
        width: 80,
        textAlign: 'center',
        marginRight: 16,
      }}
    >
      {dragging ? 'dragging' : `box-${data}`}
    </div>
  );
};

export default () => {
  const [isHovering, setIsHovering] = useState(false);

  const dropRef = useRef(null);

  useDrop(dropRef, {
    onText: (text, e) => {
      console.log(e);
      alert(`'text: ${text}' dropped`);
    },
    onFiles: (files, e) => {
      console.log(e, files);
      alert(`${files.length} file dropped`);
    },
    onUri: (uri, e) => {
      console.log(e);
      alert(`uri: ${uri} dropped`);
    },
    onDom: (content: string, e) => {
      alert(`custom: ${content} dropped`);
    },
    onDragEnter: () => setIsHovering(true),
    onDragLeave: () => setIsHovering(false),
  });

  return (
    <div>
      <div ref={dropRef} style={{ border: '1px dashed #e8e8e8', padding: 16, textAlign: 'center' }}>
        {isHovering ? 'release here' : 'drop here'}
      </div>

      <div style={{ display: 'flex', marginTop: 8, overflow: 'auto' }}>
        {['1', '2', '3', '4', '5'].map((e) => (
          <DragItem key={e} data={e} />
        ))}
      </div>
    </div>
  );
};
