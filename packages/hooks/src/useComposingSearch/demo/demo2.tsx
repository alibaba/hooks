/**
 * title: Wrapper target
 * desc: Composition events bubble, so a wrapper around a component works too.
 *
 * title.zh-CN: 包裹组件
 * desc.zh-CN: composition 事件会冒泡，包住组件的容器同样可以作为 target。
 */

import { useComposingSearch } from 'ahooks';
import { Select } from 'antd';
import { useRef, useState } from 'react';

const options = ['中国', '中文', '中秋'].map((item) => ({ label: item, value: item }));

export default () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState('');

  const { run } = useComposingSearch((value: string) => setKeyword(value), {
    target: wrapperRef,
    wait: 300,
  });

  return (
    <div>
      <div ref={wrapperRef} style={{ width: 240 }}>
        <Select
          showSearch
          filterOption={false}
          onSearch={run}
          options={options}
          placeholder="输入拼音试试"
          style={{ width: '100%' }}
        />
      </div>
      <p>最近一次搜索：{keyword || '-'}</p>
    </div>
  );
};
