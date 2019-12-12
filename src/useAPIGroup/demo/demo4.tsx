import { Button, Form, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import useAPI from '..';

const saveToServer = (data: string) =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(`${data} saved`);
    }, 2000);
  });

export default Form.create()((props: FormComponentProps) => {
  const { loading, run } = useAPI((data: string) => saveToServer(data), {
    manual: true,
    onSuccess: res => message.success(res),
    onError: error => message.error(error),
  });
  const { getFieldDecorator, getFieldValue } = props.form;

  const submit = () => {
    const fromData = getFieldValue('name');
    run(fromData);
  };

  return (
    <>
      {getFieldDecorator('name')(
        <Input style={{ width: 300, marginRight: 16 }} placeholder="please input your name" />,
      )}
      <Button loading={loading} type="primary" onClick={submit} style={{ marginTop: 16 }}>
        save
      </Button>
    </>
  );
});
