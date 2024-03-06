/**
 * title: Used in antd Form
 * description: Used in antd Form, a component can be packaged independently, like DynamicInputs in the example.
 *
 * title.zh-CN: 在 antd Form 中使用
 * description.zh-CN: 在 antd Form 中使用，可以独立封装一个组件，比如例子中的 DynamicInputs。
 */

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDynamicList } from 'ahooks';

const DynamicInputs = ({
  value = [],
  onChange,
}: {
  value?: string[];
  onChange?: (value: string[]) => void;
}) => {
  const { list, remove, getKey, insert, replace, resetList } = useDynamicList(value);

  useEffect(() => {
    // If value change manual, reset list
    if (value !== list) {
      resetList(value);
    }
  }, [value]);

  useEffect(() => {
    onChange?.(list);
  }, [list]);

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

  return <Space direction="vertical">{list.map((ele, index) => Row(index, ele))}</Space>;
};

export default () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState('');

  return (
    <>
      <Form form={form}>
        <Form.Item name="names" initialValue={['David', 'Jack']}>
          <DynamicInputs />
        </Form.Item>
      </Form>
      <Space style={{ marginBottom: 16 }} wrap>
        <Button
          type="primary"
          onClick={() =>
            form
              .validateFields()
              .then((val) => {
                setResult(JSON.stringify(val.names));
              })
              .catch(() => {})
          }
        >
          Submit
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </Space>
      <p>{result}</p>
    </>
  );
};
