import React from 'react';
import { configResponsive, useResponsive } from '..';

configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});

export default function () {
  const responsive = useResponsive();
  return (
    <>
      <p>请改变浏览器窗口宽度来查看效果：</p>
      {Object.keys(responsive).map(key => (
        <p key={key}>
          {key} {responsive[key] ? '✔' : '✘'}
        </p>
      ))}
    </>
  );
}
