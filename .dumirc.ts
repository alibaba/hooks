import { defineConfig } from 'dumi';

const packages = require('./packages/hooks/package.json');

export default defineConfig({
  exportStatic: {},
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@alifd/next',
        style: false,
      },
      'fusion',
    ],
  ],
  favicons: ['/simple-logo.svg'],
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  themeConfig: {
    logo: '/logo.svg',
    footer:
      'Open-source MIT Licensed | Copyright © 2019-present<br />Powered by <a href="https://d.umijs.org" target="_blank">dumi</a>',
  },
  manifest: {},
  hash: true,
  alias: {
    ahooks: process.cwd() + '/packages/hooks/src/index.ts',
    '@ahooksjs/use-url-state': process.cwd() + '/packages/use-url-state/src/index.ts',
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'hook', dir: 'packages/hooks/src' },
      { type: 'hook', dir: 'packages/hooks/src/useRequest/doc' },
      { type: 'hook', dir: 'packages/use-url-state' },
    ],
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  scripts: [
    'https://s4.cnzz.com/z_stat.php?id=1278992092&web_id=1278992092',
    `const insertVersion = function(){
      const dom = document.createElement('span');
      dom.id = 'logo-version';
      dom.innerHTML = '${packages.version}';
      const logo = document.querySelector('.dumi-default-logo');
      if(logo){
        logo.parentNode.insertBefore(dom, logo.nextSibling);
      }else{
        setTimeout(()=>{
          insertVersion();
        }, 1000)
      }
    }
    insertVersion();`,
  ],
});
