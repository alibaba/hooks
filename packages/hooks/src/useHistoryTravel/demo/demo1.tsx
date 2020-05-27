/**
 * title: Basic usage
 * desc: redo and undo operations
 *
 * title.zh-CN: 基本用法
 * desc.zh: 撤销跟重做操作.
 */

import React, { useState } from 'react';
import { Input, Button, List, InputNumber } from 'antd';
import { useEventTarget, useHistoryTravel } from 'ahooks';

const { Item } = List;

export default () => {
  const {
    value,
    setValue,
    backLength,
    forwardLength,
    back,
    forward,
    go
  } = useHistoryTravel(['do homework'])

  const [valueProps, reset] = useEventTarget('');
  const [step, setStep] = useState(0);

  const onAdd = () => {
    setValue([
      ...value,
      valueProps.value
    ]);
    reset();
  }

  const onGo = () => {
    go(step);
    setStep(0);
  }

  return (
    <div>
      <Input {...valueProps} placeholder="Please enter TODO name" style={{ width: 200, marginRight: 20 }}/>
      <Button onClick={onAdd}> Add TODO </Button>
      <List
        header={<div> TODO list </div>}
        dataSource={value}
        renderItem={ it => <Item> { it }</Item>}
      >
      </List>
      <div style={{ marginBottom: 20 }}>
        <Button disabled={backLength <= 0} onClick={back} style={{ marginRight: 20 }}> undo </Button>
        <Button disabled={forwardLength <= 0} onClick={forward}> redo </Button>
      </div>
      <div>
        <InputNumber value={step} onChange={setStep} max={forwardLength} min={backLength * -1} style={{ marginRight: 20 }}/>
        <Button onClick={onGo}> Go </Button>
      </div>
    </div>
  );
}
