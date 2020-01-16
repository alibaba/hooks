import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import useDynamicList from '..';

export default function() {
  const [form] = Form.useForm();
  const { list, remove, getKey, push } = useDynamicList(['David', 'Jack']);
  const { validateFields } = form;

  const [result, setResult] = useState('');

  const Row = index => (
    <Form.Item key={index}>
      <Form.Item
        name={['names', getKey(index)]}
        noStyle
        rules={[
          {
            required: true,
            message: 'required',
          },
        ]}
      >
        <Input style={{ width: 300 }} placeholder="Please enter your name" />
      </Form.Item>
      {list.length > 1 ? (
        <CloseCircleOutlined
          style={{ marginLeft: 8 }}
          onClick={() => {
            remove(index);
          }}
        />
      ) : null}
      <PlusCircleOutlined
        style={{ marginLeft: 8 }}
        onClick={() => {
          push('');
        }}
      />
    </Form.Item>
  );

  return (
    <>
      <Form form={form}>{list.map((ele, index) => Row(index))}</Form>
      <Button
        style={{ marginTop: 8 }}
        type="primary"
        onClick={() =>
          validateFields()
            .then(values => {
              setResult(JSON.stringify((values || {}).names.filter(e => !!e)));
            })
            .catch(errorInfo => {
              console.log(errorInfo);
            })
        }
      >
        Submit
      </Button>
      <div>{result}</div>
    </>
  );
}
