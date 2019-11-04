import React, { useState } from 'react';
import { Form, Button, Input, Icon } from 'antd';
import useDynamicList from '..';

export default Form.create()(props => {
  const { list, remove, getKey, push } = useDynamicList(['David', 'Jack']);
  const { getFieldDecorator, validateFields } = props.form;
  const [result, setResult] = useState('');

  const Row = (index, item) => (
    <Form.Item key={getKey(index)}>
      {getFieldDecorator(`names[${getKey(index)}]`, {
        initialValue: item,
        rules: [
          {
            required: true,
            message: '必填',
          },
        ],
      })(
        <Input
          style={{
            width: 300,
          }}
          placeholder="Please enter your name"
        />,
      )}
      {list.length > 1 && (
        <Icon
          type="minus-circle-o"
          style={{
            marginLeft: 8,
          }}
          onClick={() => {
            remove(index);
          }}
        />
      )}
      <Icon
        type="plus-circle-o"
        style={{
          marginLeft: 8,
        }}
        onClick={() => {
          push('');
        }}
      />
    </Form.Item>
  );

  return (
    <>
      <Form>
        {list.map((ele, index) => Row(index, ele))}
      </Form>
      <Button
        style={{
          marginTop: 8,
        }}
        type="primary"
        onClick={() =>
          validateFields((err, val) => {
            if (!err) {
              setResult(JSON.stringify((val || {}).names.filter(e => !!e)));
            }
          })
        }
      >
        Submit
      </Button>
      <div>{result}</div>
    </>
  );
});
