/**
 * title: Support shadow DOM
 * desc: Add the addEventListener to shadow DOM root (mode: closed) instead of the document
 *
 * title.zh-CN: 支持 shadow DOM
 * desc.zh-CN: 将 addEventListener 添加到 shadow DOM root (mode: closed)
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';
import root from 'react-shadow';

export default () => {
  const [counterOpen, setCounterOpen] = useState(0);
  const [counterClosed, setCounterClosed] = useState(0);
  const refOpen = useRef(null);
  const refCLosed = useRef(null);
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
    refCLosed,
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
            ref={refCLosed}
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
