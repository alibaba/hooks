import React, { useState } from 'react';
import { Form, Button, Input, Table } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import ReactDragListView from 'react-drag-listview';
import useDynamicList from '..';
import './demo3.less';

interface Item {
  name?: string;
  age?: string;
  memo?: string;
}

export default () => {
  const initData = {
    params: [
      { name: 'my bro', age: '23', memo: "he's my bro" },
      { name: 'my sis', age: '21', memo: "she's my sis" },
      {},
    ],
  };
  const { list, remove, getKey, move, push, sortForm } = useDynamicList<Item>(initData.params);
  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  const [result, setResult] = useState('');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, row: Item, index: number) => (
        <Form.Item>
          <Form.Item style={{ display: 'inline-block', width: '10px' }}>
            <DragOutlined style={{ cursor: 'move' }} />
          </Form.Item>
          <Form.Item
            name={['params', getKey(index), 'name']}
            style={{ display: 'inline-block', width: 'calc(100% - 18px)', marginLeft: 8 }}
          >
            <Input placeholder="name" />
          </Form.Item>
        </Form.Item>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text: string, row: Item, index: number) => (
        <Form.Item name={['params', getKey(index), 'age']}>
          <Input placeholder="age" />
        </Form.Item>
      ),
    },
    {
      key: 'memo',
      title: 'Memo',
      dataIndex: 'memo',
      render: (text: string, row: Item, index: number) => (
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name={['params', getKey(index), 'memo']}
            style={{ display: 'inline-block', width: 'calc(100% - 58px)' }}
          >
            <Input placeholder="please input the memo" />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: '50px', marginLeft: 8 }}>
            <Button.Group>
              <Button type="danger" onClick={() => remove(index)}>
                Delete
              </Button>
            </Button.Group>
          </Form.Item>
        </Form.Item>
      ),
    },
  ];

  return (
    <div className="use-dynamic-list_demo3">
      <ReactDragListView
        onDragEnd={(oldIndex: number, newIndex: number) => move(oldIndex, newIndex)}
        handleSelector={'span[aria-label="drag"]'}
      >
        <Form form={form} initialValues={list}>
          <Table
            columns={columns}
            dataSource={list}
            rowKey={(r: Item, index: number) => getKey(index).toString()}
            pagination={false}
          />
        </Form>
      </ReactDragListView>
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
        onClick={() => setResult(JSON.stringify(sortForm(getFieldsValue().params), null, 2))}
      >
        Submit
      </Button>
      <div style={{ whiteSpace: 'pre' }}>{result && `content: ${result}`}</div>
    </div>
  );
};
