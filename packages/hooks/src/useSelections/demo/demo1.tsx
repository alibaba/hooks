/**
 * title: Default usage
 * desc: Checkbox group.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 常见的 Checkbox 联动
 */

import { Checkbox, Col, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import { useSelections } from 'ahooks';

export default () => {
  const [hideOdd, setHideOdd] = useState(false);
  const list = useMemo(() => {
    if (hideOdd) {
      return [2, 4, 6, 8];
    }
    return [1, 2, 3, 4, 5, 6, 7, 8];
  }, [hideOdd]);

  const { selected, allSelected, isSelected, toggle, toggleAll, partiallySelected } = useSelections(
    list,
    {
      defaultSelected: [1],
    },
  );

  return (
    <div>
      <div>Selected: {selected.join(',')}</div>
      <div style={{ borderBottom: '1px solid #E9E9E9', padding: '10px 0' }}>
        <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
          Check all
        </Checkbox>
        <Checkbox checked={hideOdd} onClick={() => setHideOdd((v) => !v)}>
          Hide Odd
        </Checkbox>
      </div>
      <Row style={{ padding: '10px 0' }}>
        {list.map((o) => (
          <Col span={12} key={o}>
            <Checkbox checked={isSelected(o)} onClick={() => toggle(o)}>
              {o}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </div>
  );
};
