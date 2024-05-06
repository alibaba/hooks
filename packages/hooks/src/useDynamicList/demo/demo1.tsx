/**
 * title: Basic usage
 * description: Dynamic list management
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 管理动态列表
 */

import React from 'react';
import { Button, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDynamicList } from 'ahooks';

export default () => {
  const { list, remove, batchRemove, getKey, insert, replace } = useDynamicList(['David', 'Jack']);
  const listIndexes = list.map((item, index) => index);

  const Row = (index: number, item: any) => (
    <Space key={getKey(index)}>
      <Input
        placeholder="Please enter name"
        value={item}
        onChange={(e) => replace(index, e.target.value)}
      />
      {list.length > 1 && <MinusCircleOutlined onClick={() => remove(index)} />}
      <PlusCircleOutlined onClick={() => insert(index + 1, '')} />
    </Space>
  );

  return (
    <Space direction="vertical">
      <Space direction="vertical">{list.map((ele, index) => Row(index, ele))}</Space>
      <Space>
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
    </Space>
  );
};
