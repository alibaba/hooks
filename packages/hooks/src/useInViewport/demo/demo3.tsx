/**
 * title: Listening content scrolling selection menu
 * desc: Pass in 'callback', you can customize the control to trigger the event when the visible area reaches this proportion. In this example, scroll to the element area and select the corresponding menu.
 *
 * title.zh-CN: 监听内容滚动选中菜单
 * desc.zh-CN: 传入 `callback`, 可以自定义控制在可视区域达到该比例时触发事件，在这个例子中，滚动到元素区域中选中对应菜单。
 */
import { useInViewport } from 'ahooks';
import React, { useRef, useState } from 'react';

const menus = ['menu-1', 'menu-2', 'menu-3'];
const content = {
  'menu-1': 'Content for menus 1',
  'menu-2': 'Content for menus 2',
  'menu-3': 'Content for menus 3',
};

export default () => {
  const menuRef = useRef<Element[]>([]);

  const [activeMenu, setActiveMenu] = useState(menus[0]);

  useInViewport(menuRef.current, {
    callback: (entry) => {
      if (entry.isIntersecting) {
        const active = entry.target.getAttribute('id') || '';
        setActiveMenu(active);
      }
    },
  });

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  return (
    <div style={{ width: 300, height: 300, border: '1px solid', display: 'flex' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {menus.map((menu, index) => (
          <li
            key={menu}
            style={{
              padding: '10px',
              backgroundColor: activeMenu === menu ? 'lightgray' : 'white',
            }}
          >
            <span style={{ cursor: 'pointer' }} onClick={() => handleMenuClick(menu)}>
              {menu}
            </span>
          </li>
        ))}
      </ul>
      <div style={{ flex: 1, overflow: 'scroll' }}>
        {menus.map((menu, index) => (
          <div
            ref={(el: any) => {
              menuRef.current[index] = el;
            }}
            key={menu}
            id={menu}
            style={{
              height: 500,
              backgroundColor: 'lightgray',
              padding: 20,
            }}
          >
            {content[menu]}
          </div>
        ))}
      </div>
    </div>
  );
};
