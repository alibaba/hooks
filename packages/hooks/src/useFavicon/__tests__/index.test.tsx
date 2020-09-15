import React, { useState } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import useFavicon from '../index';

Enzyme.configure({ adapter: new Adapter() });

// 直接导入demo1.tsx作为测试会报错(import { useFavicon } from 'ahooks')
const DEFAULT_FAVICON_URL = 'https://ahooks.js.org/simple-logo.svg';
const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>(DEFAULT_FAVICON_URL);
  useFavicon(url);
  return (
    <>
      <p>
        当前Favicon: <span>{url}</span>
      </p>
      <button
        id="google"
        style={{ marginRight: 16 }}
        onClick={() => {
          setUrl(GOOGLE_FAVICON_URL);
        }}
      >
        Change To Google Favicon
      </button>
      <button
        id="ahooks"
        onClick={() => {
          setUrl(DEFAULT_FAVICON_URL);
        }}
      >
        Back To AHooks Favicon
      </button>
    </>
  );
};

describe.only('useFavicon Hook', () => {
  it('should be defined as function', () => {
    expect(useFavicon).toBeDefined();
    expect(typeof useFavicon).toBe('function');
  });

  it('should toggle favicon when URL changed', () => {
    const wrapper = mount(<App />);
    const currentFaviconURL = wrapper.find('span').at(0);
    const toggleToGoogleBtn = wrapper.find('button').at(0);
    const toggleToAHooksBtn = wrapper.find('button').at(1);
    expect(currentFaviconURL.text()).toBe(DEFAULT_FAVICON_URL);
    toggleToGoogleBtn.simulate('click');
    expect(currentFaviconURL.text()).toBe(GOOGLE_FAVICON_URL);
    toggleToAHooksBtn.simulate('click');
    expect(currentFaviconURL.text()).toBe(DEFAULT_FAVICON_URL);
  });
});
