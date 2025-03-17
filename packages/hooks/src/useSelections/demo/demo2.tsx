/**
 * title: Object array
 * desc: When array items are object, you need to specify the field name for the unique key.
 *
 * title.zh-CN: 对象数组
 * desc.zh-CN: 数组项是对象时，需要指定唯一 key 的字段名称。
 */

import { Checkbox, Col, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import { useSelections } from 'ahooks';

export default () => {
  const [hideOdd, setHideOdd] = useState(false);
  const list = useMemo(() => {
    if (hideOdd) {
      return [2, 4, 6, 8].map((id) => ({ id }));
    }
    return [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({ id }));
  }, [hideOdd]);

  const { selected, allSelected, isSelected, toggle, toggleAll, partiallySelected } = useSelections(
    list,
    {
      defaultSelected: [{ id: 1 }],
      itemKey: 'id',
    },
  );

  return (
    <div>
      <div>Selected: {JSON.stringify(selected)}</div>
      <div style={{ borderBottom: '1px solid #E9E9E9', padding: '10px 0' }}>
        <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
          Check all
        </Checkbox>
        <Checkbox checked={hideOdd} onClick={() => setHideOdd((v) => !v)}>
          Hide Odd
        </Checkbox>
      </div>
      <Row style={{ padding: '10px 0' }}>
        {list.map((item) => (
          <Col span={12} key={item.id}>
            <Checkbox checked={isSelected(item)} onClick={() => toggle(item)}>
              {item.id}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </div>
  );
};
