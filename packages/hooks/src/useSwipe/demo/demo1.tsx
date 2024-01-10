/**
 * title: Basic usage
 * desc: useSwipe
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useSwipe
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSwipe } from 'ahooks';

export default () => {
  const el = useRef<HTMLDivElement>(null);
  const containerWidth = useMemo(() => el.current?.offsetWidth || 1, [el.current]);
  const [elStyle, setElStyle] = useState<React.CSSProperties>({
    opacity: 1,
    left: 0,
  });

  const { isSwiping, direction, lengthX, lengthY } = useSwipe(el, {
    onSwipeEnd() {
      if (lengthX < 0 && containerWidth && Math.abs(lengthX) / containerWidth >= 0.5) {
        setElStyle({
          transition: 'all',
          transitionDuration: '250ms',
          left: '100%',
          opacity: 0,
        });
      } else {
        setElStyle({
          left: '0',
          opacity: 1,
        });
      }
    },
  });

  useEffect(() => {
    let opacity = 1;
    let left = '0';

    if (lengthX < 0) {
      left = `${-lengthX}px`;
      opacity = 1.1 - Math.abs(lengthX) / (el.current?.offsetWidth || 1);
    }

    setElStyle({
      left,
      opacity,
    });
  }, [lengthX]);

  return (
    <div>
      <div
        ref={el}
        style={{
          position: 'relative',
          border: '1px solid #e8e8e8',
          padding: 8,
          width: '90%',
          textAlign: 'center',
          background: '#4e66d1',
          color: 'white',
          ...elStyle,
        }}
      >
        <p>Swipe right</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 20,
        }}
        onClick={() =>
          setElStyle({
            opacity: 1,
            left: 0,
          })
        }
      >
        <button>reset</button>
      </div>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <p>isSwiping: {String(isSwiping)}</p>
        <p>direction: {direction}</p>
        <p>
          lengthX: {lengthX} | lengthY: {lengthY}
        </p>
      </div>
    </div>
  );
};
