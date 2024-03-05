/**
 * title: Another way of writing used in antd Form
 * description: Pay attention to the use of sortList. The data of antd Form is not sorted correctly. sortList can be used to calibrate the sorting.
 *
 * title.zh-CN: 在 antd Form 中使用的另一种写法
 * description.zh-CN: 注意 sortList 的使用，antd Form 获取的数据排序不对，通过 sortList 可以校准排序。
 */

import React, { useState } from 'react';
import { Form, Button, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDynamicList } from 'ahooks';

const DEFAULT_LIST = ['David', 'Jack'];

export default () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState('');
  const { list, remove, getKey, insert, sortList, resetList } = useDynamicList(DEFAULT_LIST);

  const Row = (index: number, item: any) => (
    <Space key={getKey(index)} align="start">
      <Form.Item
        rules={[{ required: true, message: 'required' }]}
        name={['names', getKey(index)]}
        initialValue={item}
      >
        <Input placeholder="Please enter your name" />
      </Form.Item>
      <Space style={{ marginTop: 6 }}>
        {list.length > 1 && <MinusCircleOutlined onClick={() => remove(index)} />}
        <PlusCircleOutlined onClick={() => insert(index + 1, '')} />
      </Space>
    </Space>
  );

  return (
    <>
      <Form form={form}>
        <Space direction="vertical">{list.map((ele, index) => Row(index, ele))}</Space>
      </Form>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() =>
            form
              .validateFields()
              .then((val) => {
                const sortedResult = sortList(val.names);
                setResult(JSON.stringify(sortedResult));
              })
              .catch(() => {})
          }
        >
          Submit
        </Button>
        <Button onClick={() => resetList(DEFAULT_LIST)}>Reset</Button>
      </Space>
      <div>{result}</div>
    </>
  );
};
