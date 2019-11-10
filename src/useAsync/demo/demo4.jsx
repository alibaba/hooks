import { Button, Form, Input, message } from 'antd';
import React from 'react';
import useAsync from '..';

const saveToServer = data =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(`${data} saved`);
    }, 2000);
  });

export default Form.create()(props => {
  const { loading, run } = useAsync(data => saveToServer(data), [], {
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
        <Input
          style={{
            width: 300,
            marginRight: 16,
          }}
          placeholder="please input your name"
        />,
      )}
      <Button
        type="primary"
        loading={loading}
        onClick={submit}
        style={{
          marginTop: 16,
        }}
      >
        save
      </Button>
    </>
  );
});
