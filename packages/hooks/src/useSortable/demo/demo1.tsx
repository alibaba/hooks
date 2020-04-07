/**
 * title: Default usage
 * desc: Dragging the list items to sort them. the node with type&#58; 'dummy' represent the placeholder for the release position.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 通过拖拽列表项来重新排序, type&#58; 'dummy' 的节点表示被将被释放位置的占位区域。
 */

import React from 'react';
import { message, Button } from 'antd';
import useSortable from '../index';

export default () => {
  const [ list, setList ] = useSortable<string>({
    initialValue: ['1', '2(disabled)', '3'],
    disabledItems: (e) => e.includes('disabled'),
    onSort: (oldIndex, newIndex, oldList, newList) => {
      message.success(`${oldList[oldIndex]} moved from ${oldIndex} to ${newIndex}`);
    }
  });
    
  return (<>
    {list.map(ele => 
      <div
        style={{ border: '1px solid #e8e8e8', height: 66,  margin: 8, padding: 8, lineHeight: '50px' }}
        key={ele.type + ele.content}
        {...ele.props}
      >
        {ele.type === 'dummy' ? 'drop it here' : ele.content}
      </div>
    )}
    <Button style={{ marginLeft: 8 }} onClick={()=>setList(l => l.concat((list.length + 1).toString()))}>append Item</Button>
    </>
  );
};
