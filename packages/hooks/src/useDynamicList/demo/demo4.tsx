/**
 * title: Draggable dynamic table
 * description: Using antd Table to build dynamic table form.
 *
 * title.zh-CN: 可拖拽的动态表格
 * description.zh-CN: 使用 antd table 构建动态表格
 */

import React, { useState } from 'react';
import ReactDragListView from 'react-drag-listview';
import { Button, Form, Input, Space, Table } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import { useDynamicList } from 'ahooks';

interface Item {
  name?: string;
  age?: string;
  memo?: string;
}

const DEFAULT_LIST = [
  { name: 'my bro', age: '23', memo: "he's my bro" },
  { name: 'my sis', age: '21', memo: "she's my sis" },
  {},
];

export default () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState('');
  const { list, remove, getKey, move, push, sortList, resetList } =
    useDynamicList<Item>(DEFAULT_LIST);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, row: Item, index: number) => (
        <Space wrap>
          <DragOutlined style={{ cursor: 'move' }} />
          <Form.Item name={['params', getKey(index), 'name']} initialValue={text} noStyle>
            <Input placeholder="name" />
          </Form.Item>
        </Space>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text: string, row: Item, index: number) => (
        <Form.Item name={['params', getKey(index), 'age']} initialValue={text} noStyle>
          <Input placeholder="age" />
        </Form.Item>
      ),
    },
    {
      key: 'memo',
      title: 'Memo',
      dataIndex: 'memo',
      render: (text: string, row: Item, index: number) => (
        <Space wrap>
          <Form.Item name={['params', getKey(index), 'memo']} initialValue={text} noStyle>
            <Input placeholder="please input the memo" />
          </Form.Item>
          <Button danger onClick={() => remove(index)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Form form={form}>
        {/* @ts-ignore */}
        <ReactDragListView
          onDragEnd={(oldIndex: number, newIndex: number) => move(oldIndex, newIndex)}
          handleSelector={'span[aria-label="drag"]'}
        >
          <Table
            columns={columns}
            dataSource={list}
            rowKey={(r: Item, index: number) => getKey(index).toString()}
            pagination={false}
            style={{ overflow: 'auto' }}
          />
        </ReactDragListView>
      </Form>
      <Button
        style={{ margin: '16px 0' }}
        block
        type="dashed"
        onClick={() => push({ name: 'new row', age: '25' })}
      >
        + Add row
      </Button>
      <Space style={{ width: '100%', marginBottom: 16 }} wrap>
        <Button
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((val) => {
                console.log(val, val.params);
                const sortedResult = sortList(val.params);
                setResult(JSON.stringify(sortedResult));
              })
              .catch(() => {});
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            resetList(DEFAULT_LIST);
            setResult('');
          }}
        >
          Reset
        </Button>
      </Space>
      <p>{result}</p>
    </>
  );
};
