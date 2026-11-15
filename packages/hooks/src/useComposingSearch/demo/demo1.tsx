/**
 * title: Composing search
 * desc: Typing pinyin does not trigger a search; the committed text does.
 *
 * title.zh-CN: 组词感知搜索
 * desc.zh-CN: 输入拼音时不会触发搜索，选中文字后才触发。
 */

import { useComposingSearch } from 'ahooks';
import { useRef, useState } from 'react';

export default () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const [count, setCount] = useState(0);

  const { run } = useComposingSearch(
    (value: string) => {
      setKeyword(value);
      setCount((c) => c + 1);
    },
    { target: inputRef, wait: 300 },
  );

  return (
    <div>
      <input
        ref={inputRef}
        placeholder="输入中文试试"
        onChange={(e) => run(e.target.value)}
        style={{ width: 240 }}
      />
      <p>
        最近一次搜索：{keyword || '-'}（已触发 {count} 次）
      </p>
    </div>
  );
};
