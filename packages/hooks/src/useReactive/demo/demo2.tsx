/**
 * title: Array
 * description:
 *
 * title.zh-CN: 数组操作
 * description.zh-CN:
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useReactive } from 'ahooks';

export default () => {
  const state = useReactive<{ arr: number[] }>({
    arr: [],
  });

  return (
    <>
      <Space style={{ marginBottom: 8 }} wrap>
        <Button role="pushbtn" onClick={() => state.arr.push(Math.floor(Math.random() * 100))}>
          push
        </Button>
        <Button role="popbtn" onClick={() => state.arr.pop()}>
          pop
        </Button>
        <Button role="shiftbtn" onClick={() => state.arr.shift()}>
          shift
        </Button>
        <Button
          role="unshiftbtn"
          onClick={() => state.arr.unshift(Math.floor(Math.random() * 100))}
        >
          unshift
        </Button>
        <Button role="reverse" onClick={() => state.arr.reverse()}>
          reverse
        </Button>
        <Button role="sort" onClick={() => state.arr.sort()}>
          sort
        </Button>
      </Space>
      <p>
        state.arr: <span role="test-array">{JSON.stringify(state.arr)}</span>
      </p>
    </>
  );
};
