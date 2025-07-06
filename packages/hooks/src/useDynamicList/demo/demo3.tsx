/**
 * title: Used in antd Form
 * desc: Pay attention to the use of sortList. The data of antd Form is not sorted correctly. sortList can be used to calibrate the sorting.
 *
 * title.zh-CN: 在 antd Form 中使用的另一种写法
 * desc.zh-CN: 注意 sortList 的使用，antd Form 获取的数据排序不对，通过 sortList 可以校准排序。
 */

import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDynamicList } from 'ahooks';

export default () => {
  const { list, remove, getKey, insert, resetList, sortList } = useDynamicList(['David', 'Jack']);
  const [form] = Form.useForm();

  const [result, setResult] = useState('');

  const Row = (index: number, item: any) => (
    <div style={{ display: 'flex' }} key={getKey(index)}>
      <div>
        <Form.Item
          rules={[{ required: true, message: 'required' }]}
          name={['names', getKey(index)]}
          initialValue={item}
        >
          <Input style={{ width: 300 }} placeholder="Please enter your name" />
        </Form.Item>
      </div>
      <div style={{ marginTop: 4 }}>
        {list.length > 1 && (
          <MinusCircleOutlined
            style={{ marginLeft: 8 }}
            onClick={() => {
              remove(index);
            }}
          />
        )}
        <PlusCircleOutlined
          style={{ marginLeft: 8 }}
          onClick={() => {
            insert(index + 1, '');
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <Form form={form}>{list.map((ele, index) => Row(index, ele))}</Form>
      <Button
        type="primary"
        onClick={() =>
          form
            .validateFields()
            .then((val) => {
              const sortedResult = sortList(val.names);
              setResult(JSON.stringify(sortedResult, null, 2));
            })
            .catch(() => {})
        }
      >
        Submit
      </Button>
      <Button style={{ marginLeft: 16 }} onClick={() => resetList(['David', 'Jack'])}>
        Reset
      </Button>

      <div>{result}</div>
    </>
  );
};
