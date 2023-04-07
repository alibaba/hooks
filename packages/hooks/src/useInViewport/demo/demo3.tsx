/**
 * title: Listening content scrolling selection menu
 * desc: Pass the `callback` that is triggered when the callback of `IntersectionObserver` is called, so you can do some customization.
 *
 * title.zh-CN: 监听内容滚动选中菜单
 * desc.zh-CN: 传入 `callback`, 使得 `IntersectionObserver` 的回调被调用时，用户可以做一些自定义操作。
 */
import { useInViewport, useMemoizedFn } from 'ahooks';
import React, { useRef, useState } from 'react';

const menus = ['menu-1', 'menu-2', 'menu-3'];
const content = {
  'menu-1': 'Content for menus 1',
  'menu-2': 'Content for menus 2',
  'menu-3': 'Content for menus 3',
};

export default () => {
  const menuRef = useRef<HTMLDivElement[]>([]);

  const [activeMenu, setActiveMenu] = useState(menus[0]);

  const callback = useMemoizedFn((entry) => {
    if (entry.isIntersecting) {
      const active = entry.target.getAttribute('id') || '';
      setActiveMenu(active);
    }
  });

  const handleMenuClick = (index) => {
    const contentEl = document.getElementById('content-scroll');
    const top = menuRef.current[index]?.offsetTop;

    contentEl?.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  useInViewport(menuRef.current, {
    callback,
    root: () => document.getElementById('parent-scroll'),
    rootMargin: '-50% 0px -50% 0px',
  });

  return (
    <div
      id="parent-scroll"
      style={{ width: 300, height: 300, border: '1px solid', display: 'flex', overflow: 'hidden' }}
    >
      <div style={{ width: '30%', backgroundColor: '#f0f0f0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menus.map((menu, index) => (
            <li
              key={menu}
              onClick={() => handleMenuClick(index)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'background-color 0.2s ease-in-out',
                backgroundColor: activeMenu === menu ? '#e0e0e0' : '',
              }}
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>
      <div id="content-scroll" style={{ flex: 1, overflowY: 'scroll', position: 'relative' }}>
        {menus.map((menu, index) => (
          <div
            ref={(el: HTMLDivElement) => {
              menuRef.current[index] = el;
            }}
            key={menu}
            id={menu}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 16,
            }}
          >
            {content[menu]}
          </div>
        ))}
      </div>
    </div>
  );
};
