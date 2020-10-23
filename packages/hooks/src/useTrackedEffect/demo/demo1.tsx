/**
 * title: Basic usage
 * desc: This hook is exactly the same as useEffect, except it omits the first render and only runs when dependencies update.
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN: 使用上与 useEffect 完全相同，只是它忽略了首次渲染，且只在依赖项更新时运行。
 */

import React, { useLayoutEffect, useState } from 'react';
import { useTrackedEffect } from 'ahooks';

export default () => {
  const [dep1, setDep1] = useState(0);
  const [dep2, setDep2] = useState(0);
  const [dep3, setDep3] = useState(0);
  const [depActiveList, setDepActiveList] = useState([false, false, false]);
  const [text, setText] = useState('Hi there...');
  const toggleDep = (idx) => {
    const newList = [...depActiveList];
    newList[idx] = !newList[idx];
    setDepActiveList(newList);
  };
  const mutateDep = () => {
    setText(``);
    depActiveList[0] && setDep1((c) => c + 1);
    depActiveList[1] && setDep2((c) => c + 1);
    depActiveList[2] && setDep3((c) => c + 1);
  };
  useTrackedEffect(
    (changes) => {
      setText(`Index of changed dependencies: ` + changes);
      return () => {
        // do something
      };
    },
    [dep1, dep2, dep3],
  );
  return (
    <div>
      <p>
        <input type="checkbox" checked={depActiveList[0]} onChange={() => toggleDep(0)} />
        &nbsp;Dependency 0 : {dep1}
      </p>
      <p>
        <input type="checkbox" checked={depActiveList[1]} onChange={() => toggleDep(1)} />
        &nbsp;Dependency 1 : {dep2}
      </p>
      <p>
        <input type="checkbox" checked={depActiveList[2]} onChange={() => toggleDep(2)} />
        &nbsp;Dependency 2 : {dep3}
      </p>
      <p>
        <button type="button" onClick={mutateDep}>
          Increase count
        </button>
      </p>
      <p>{text}</p>
    </div>
  );
};
