import React, { useState } from 'react';
import { Form, Button, Input, Icon, Table } from 'antd';
import ReactDragListView from 'react-drag-listview';
import useDynamicList from '..';

export default Form.create()(props => {
  const { list, remove, getKey, move, push, sortForm } = useDynamicList([
    {
      name: 'my bro',
      age: '23',
      memo: "he's my bro",
    },
    {
      name: 'my sis',
      age: '21',
      memo: "she's my sis",
    },
    {},
  ]);
  const { getFieldDecorator, getFieldsValue } = props.form;
  const [result, setResult] = useState('');
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, row, index) => (
          <>
            <Icon
              style={{
                cursor: 'move',
                marginRight: 8,
              }}
              type="drag"
            />
            {getFieldDecorator(`params[${getKey(index)}].name`, {
              initialValue: text,
            })(
              <Input
                style={{
                  width: 120,
                  marginRight: 16,
                }}
                placeholder="name"
              />,
            )}
          </>
        ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text, row, index) => (
          <>
            {getFieldDecorator(`params[${getKey(index)}].age`, {
              initialValue: text,
            })(
              <Input
                style={{
                  width: 120,
                  marginRight: 16,
                }}
                placeholder="age"
              />,
            )}
          </>
        ),
    },
    {
      key: 'memo',
      title: 'Memo',
      dataIndex: 'memo',
      render: (text, row, index) => (
          <>
            {getFieldDecorator(`params[${getKey(index)}].memo`, {
              initialValue: text,
            })(
              <Input
                style={{
                  width: 300,
                  marginRight: 16,
                }}
                placeholder="please input the memo"
              />,
            )}
            <Button.Group>
              <Button type="danger" onClick={() => remove(index)}>
                Delete
              </Button>
            </Button.Group>
          </>
        ),
    },
  ];
  return (
    <>
      <ReactDragListView
        onDragEnd={(oldIndex, newIndex) => move(oldIndex, newIndex)}
        handleSelector={'i[aria-label="icon: drag"]'}
      >
        <Table
          columns={columns}
          dataSource={list}
          rowKey={(r, index) => getKey(index).toString()}
          pagination={false}
        />
      </ReactDragListView>
      <Button
        style={{
          marginTop: 8,
        }}
        block
        type="dashed"
        onClick={() =>
          push({
            name: 'new row',
            age: '25',
          })
        }
      >
        + Add row
      </Button>
      <Button
        type="primary"
        style={{
          marginTop: 16,
        }}
        onClick={() => setResult(JSON.stringify(sortForm(getFieldsValue().params), null, 2))}
      >
        Submit
      </Button>
      <div
        style={{
          whiteSpace: 'pre',
        }}
      >
        {result && `content: ${result}`}
      </div>
    </>
  );
});
