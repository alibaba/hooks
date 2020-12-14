/**
 * title: Default usage
 * desc: Default as a switch function, or accept a parameter to change state.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 默认切换布尔值状态，也可以接收一个参数作为新的值。
 */

import React from 'react';
import { useBindState } from 'ahooks';
import { Input, Row, Col } from 'antd';

export default () => {
  const { state, options } = useBindState({
    user: { name: 'xx' },
    age: 12,
  });

  return (
    <div>
      <p>Effects：{JSON.stringify(state)}</p>
      <Row>
        <Col>
          <Input style={{ width: 200 }} {...options('user.name', 'event')} />
        </Col>
        <Col>
          <Input style={{ width: 200 }} {...options('age', 'event')} />
        </Col>
      </Row>
    </div>
  );
};
