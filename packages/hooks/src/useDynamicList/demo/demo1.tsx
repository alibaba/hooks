/**
 * title: Basic usage
 * desc: Dynamic list management
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 管理动态列表
 */

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDynamicList } from 'ahooks';
import { Button, Input, Space } from 'antd';
import React from 'react';

export default () => {
  const { list, remove, batchRemove, getKey, insert, replace } = useDynamicList(['David', 'Jack']);
  const listIndexes = list.map((item, index) => index);

  const Row = (index: number, item: any) => (
    <div key={getKey(index)} style={{ marginBottom: 16 }}>
      <Input
        style={{ width: 300 }}
        placeholder="Please enter name"
        onChange={(e) => replace(index, e.target.value)}
        value={item}
      />

      {list.length > 1 && (
        <MinusCircleOutlined
          style={{ marginLeft: 8 }}
          onClick={() => {
            remove(index);
          }}
        />
      )}
      <PlusCircleOutlined
        style={{ marginLeft: 8 }}
        onClick={() => {
          insert(index + 1, '');
        }}
      />
    </div>
  );

  return (
    <>
      {list.map((ele, index) => Row(index, ele))}

      <Space style={{ marginBottom: 16 }}>
        <Button
          danger
          disabled={list.length <= 1}
          onClick={() => batchRemove(listIndexes.filter((index) => index % 2 === 0))}
        >
          Remove odd items
        </Button>
        <Button
          danger
          disabled={list.length <= 1}
          onClick={() => batchRemove(listIndexes.filter((index) => index % 2 !== 0))}
        >
          Remove even items
        </Button>
      </Space>

      <div>{JSON.stringify([list])}</div>
    </>
  );
};
