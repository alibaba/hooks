/**
 * title: Draggable dynamic table
 * desc: Using antd Table to build dynamic table form.
 *
 * title.zh-CN: 可拖拽的动态表格
 * desc.zh-CN: 使用 antd table 构建动态表格
 */

import { DragOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table } from 'antd';
import React, { useState } from 'react';
import ReactDragListView from 'react-drag-listview';
import { useDynamicList } from 'ahooks';

interface Item {
  name?: string;
  age?: string;
  memo?: string;
}

export default () => {
  const { list, remove, getKey, move, push, sortList } = useDynamicList<Item>([
    { name: 'my bro', age: '23', memo: "he's my bro" },
    { name: 'my sis', age: '21', memo: "she's my sis" },
    {},
  ]);

  const [form] = Form.useForm();

  const [result, setResult] = useState('');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, row: Item, index: number) => (
        <>
          <DragOutlined style={{ cursor: 'move', marginRight: 8 }} />
          <Form.Item name={['params', getKey(index), 'name']} initialValue={text} noStyle>
            <Input style={{ width: 120, marginRight: 16 }} placeholder="name" />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text: string, row: Item, index: number) => (
        <Form.Item name={['params', getKey(index), 'age']} initialValue={text} noStyle>
          <Input style={{ width: 120, marginRight: 16 }} placeholder="age" />
        </Form.Item>
      ),
    },
    {
      key: 'memo',
      title: 'Memo',
      dataIndex: 'memo',
      render: (text: string, row: Item, index: number) => (
        <>
          <Form.Item name={['params', getKey(index), 'memo']} initialValue={text} noStyle>
            <Input style={{ width: 300, marginRight: 16 }} placeholder="please input the memo" />
          </Form.Item>
          <Button.Group>
            <Button danger onClick={() => remove(index)}>
              Delete
            </Button>
          </Button.Group>
        </>
      ),
    },
  ];

  return (
    <div>
      <Form form={form}>
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
        style={{ marginTop: 8 }}
        block
        type="dashed"
        onClick={() => push({ name: 'new row', age: '25' })}
      >
        + Add row
      </Button>
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={() => {
          form
            .validateFields()
            .then((val) => {
              console.log(val, val.params);
              const sortedResult = sortList(val.params);
              setResult(JSON.stringify(sortedResult, null, 2));
            })
            .catch(() => {});
        }}
      >
        Submit
      </Button>
      <div style={{ whiteSpace: 'pre' }}>{result && `content: ${result}`}</div>
    </div>
  );
};
