import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import useDynamicList from '..';

const Card = props => {
  const { list, getKey, push } = useDynamicList(props.list || [1]);

  return (
    <div style={{ border: '1px solid #e8e8e8', padding: 16, marginBottom: 16 }}>
      <Form.Item name={['params', props.index, 'name']} label="Group Name">
        <Input placeholder="Please enter group name" />
      </Form.Item>

      <Form.Item label="frequency">
        {list.map((ele, index) => (
          <div style={{ marginBottom: 16 }} key={getKey(index)}>
            <Form.Item name={['params', props.index, 'list', getKey(index), 'name']}>
              <Input placeholder="Please enter the advertisement name" addonBefore="name：" />
            </Form.Item>
            <Form.Item name={['params', props.index, 'list', getKey(index), 'value']}>
              <Input placeholder="Please entery the frequency" addonAfter="times/day" />
            </Form.Item>
          </div>
        ))}
      </Form.Item>
      <Button block onClick={push}>
        Add advertisement
      </Button>
    </div>
  );
};

export default () => {
  const [result, setResult] = useState('');
  const [form] = Form.useForm();

  const initialValues = {
    params: [
      {
        name: 'Group 1',
        list: [{ name: 'ad1', value: 2 }, { name: 'ad2', value: 1 }],
      },
    ],
  };

  const { list, push, getKey, sortForm } = useDynamicList(initialValues.params);
  return (
    <div style={{ width: 800, margin: 'auto', display: 'flex' }}>
      <div style={{ width: 400, marginRight: 16 }}>
        <Form form={form} initialValues={initialValues}>
          {list.map((ele, index) => (
            <Card
              form={form}
              key={getKey(index)}
              list={ele.list}
              name={ele.name}
              index={getKey(index)}
            />
          ))}
        </Form>
        <Button style={{ marginTop: 16 }} block onClick={() => push({})}>
          Add Group
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            const res = form.getFieldsValue().params;
            const sortedResult = sortForm(res);
            setResult(JSON.stringify(sortedResult, null, 2));
          }}
        >
          Retrieve form data
        </Button>
        <div>
          <pre>{result}</pre>
        </div>
      </div>
    </div>
  );
};
