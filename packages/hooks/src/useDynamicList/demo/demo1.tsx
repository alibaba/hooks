/**
 * title: Basic usage
 * description: Dynamic list management
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 管理动态列表
 */

import React from 'react';
import { Input, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDynamicList } from 'ahooks';

export default () => {
  const { list, remove, getKey, insert, replace } = useDynamicList(['David', 'Jack']);

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
    <>
      <Space style={{ marginBottom: 16 }} direction="vertical">
        {list.map((ele, index) => Row(index, ele))}
      </Space>
      <p>{JSON.stringify(list)}</p>
    </>
  );
};
