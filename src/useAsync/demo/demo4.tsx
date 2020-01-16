import { Button, Form, Input, message } from 'antd';
import React from 'react';
import useAsync from '..';

const saveToServer = (data: string) =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(`${data} saved`);
    }, 2000);
  });

export default () => {
  const [form] = Form.useForm();
  const { loading, run } = useAsync<string>(data => saveToServer(data), [], {
    manual: true,
    onSuccess: res => message.success(res),
    onError: error => message.error(error),
  });
  const { getFieldValue } = form;

  const submit = () => {
    const fromData = getFieldValue('name');
    run(fromData);
  };

  return (
    <Form form={form}>
      <Form.Item name="name">
        <Input style={{ width: 300, marginRight: 16 }} placeholder="please input your name" />
      </Form.Item>
      <Button type="primary" loading={loading} onClick={submit} style={{ marginTop: 16 }}>
        save
      </Button>
    </Form>
  );
};
