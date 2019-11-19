import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import useClickAway from '..';

export default () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  useClickAway(() => {
    setCounter1(s => s + 1);
  }, 'box1');
  useClickAway(
    () => {
      setCounter2(s => s + 1);
    },
    () => document.querySelector('#box2'),
  );

  return (
    <Row gutter={24}>
      <Col span={2}>
        <Button id="box1" type="primary">
          box1
        </Button>
        <p>counter1: {counter1}</p>
      </Col>
      <Col span={2}>
        <Button id="box2">box2</Button>
        <p>counter2: {counter2}</p>
      </Col>
    </Row>
  );
};
