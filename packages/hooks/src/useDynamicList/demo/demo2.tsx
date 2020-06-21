/**
 * title: Nesting forms
 * desc: nesting dynamic forms in a set of form groups.
 *
 * title.zh-CN: 嵌套表单
 * desc.zh-CN: 动态表单内部嵌套动态表单
 */

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useDynamicList } from 'ahooks';

interface CardProps extends FormComponentProps {
  index: number;
  list: any[];
  name: string;
}

const Card = (props: CardProps) => {
  const { list, getKey, push } = useDynamicList(props.list || [1]);

  return (
    <div style={{ border: '1px solid #e8e8e8', padding: 16, marginBottom: 16 }}>
      <Form.Item label="Group Name">
        {props.form.getFieldDecorator(`params[${props.index}].groupName`, {
          initialValue: props.name,
        })(<Input placeholder="Please enter group name" />)}
      </Form.Item>

      <Form.Item label="frequency">
        {list.map((ele, index) => (
          <div style={{ marginBottom: 16 }} key={getKey(index)}>
            {props.form.getFieldDecorator(`params[${props.index}].ad[${getKey(index)}].name`, {
              initialValue: ele.name,
            })(<Input placeholder="Please enter the advertisement name" addonBefore="name：" />)}
            {props.form.getFieldDecorator(`params[${props.index}].ad[${getKey(index)}].frequency`, {
              initialValue: ele.value,
            })(<Input placeholder="Please entery the frequency" addonAfter="times/day" />)}
          </div>
        ))}
      </Form.Item>
      <Button block onClick={push}>
        Add advertisement
      </Button>
    </div>
  );
};

interface ListItem {
  name: string;
  list: Array<{ name: string; value: number }>;
}

export default Form.create()((props: FormComponentProps) => {
  const [result, setResult] = useState('');

  const { list, push, getKey, sortForm } = useDynamicList<ListItem>([
    {
      name: 'Group 1',
      list: [
        { name: 'ad1', value: 2 },
        { name: 'ad2', value: 1 },
      ],
    },
  ]);

  return (
    <div style={{ width: 800, margin: 'auto', display: 'flex' }}>
      <div style={{ width: 400, marginRight: 16 }}>
        {list.map((ele, index) => (
          <Card
            form={props.form}
            key={getKey(index)}
            list={ele.list}
            name={ele.name}
            index={getKey(index)}
          />
        ))}
        <Button style={{ marginTop: 16 }} block onClick={() => push({} as ListItem)}>
          Add Group
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            const res = props.form.getFieldsValue().params;
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
});
