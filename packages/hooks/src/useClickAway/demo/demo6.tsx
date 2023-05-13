/**
 * title: Support shadow DOM
 * desc: If mode with closed, add the addEventListener to shadow DOM root instead of the document
 *
 * title.zh-CN: 支持 shadow DOM
 * desc.zh-CN: 如果 mode 为 closed，将 addEventListener 添加到 shadow DOM root
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';
import root from 'react-shadow';

export default () => {
  const [counterOpen, setCounterOpen] = useState(0);
  const [counterClosed, setCounterClosed] = useState(0);
  const refOpen = useRef(null);
  const refClosed = useRef(null);
  useClickAway(
    () => {
      setCounterOpen((s) => s + 1);
    },
    refOpen,
    ['click', 'contextmenu'],
  );
  useClickAway(
    () => {
      setCounterClosed((s) => s + 1);
    },
    refClosed,
    ['click', 'contextmenu'],
  );

  return (
    <div>
      <p>Shadow root mode: open</p>
      <root.div>
        <div>
          <button type="button" ref={refOpen}>
            box
          </button>
          <p>counter: {counterOpen}</p>
        </div>
      </root.div>
      <p>Shadow root mode: closed</p>
      <root.div mode="closed">
        <div>
          <button
            type="button"
            ref={refClosed}
            onLoad={() => {
              console.log('hello');
            }}
          >
            box
          </button>
          <p>counter: {counterClosed}</p>
        </div>
      </root.div>
    </div>
  );
};
