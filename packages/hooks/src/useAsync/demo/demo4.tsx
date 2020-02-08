/**
 * title: Form Submission
 * desc: A form submit example incorporate with antd form.
 *
 * title.zh-CN: 表单提交
 * desc.zh-CN: 配合 antd 表单提交的例子。
 */

import { Button, Form, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { useAsync } from '@umijs/hooks';

const saveToServer = (data: string) =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(`${data} saved`);
    }, 2000);
  });

export default Form.create()((props: FormComponentProps) => {
  const { loading, run } = useAsync<string>(data => saveToServer(data), [], {
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
      <Button type="primary" loading={loading} onClick={submit} style={{ marginTop: 16 }}>
        save
      </Button>
    </>
  );
});
