import { defineConfig } from 'dumi';

const packages = require('./packages/hooks/package.json');

export default defineConfig({
  mfsu: false,
  hash: true,
  ssr: process.env.NODE_ENV === 'development' ? false : {},
  manifest: {},
  alias: {
    ahooks: process.cwd() + '/packages/hooks/src/index.ts',
    '@ahooksjs/use-url-state': process.cwd() + '/packages/use-url-state/src/index.ts',
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'hook', dir: 'packages/hooks/src' },
      { type: 'hook', dir: 'packages/hooks/src/useRequest/docs' },
      { type: 'hook', dir: 'packages/use-url-state' },
    ],
  },
  sitemap: {
    hostname: 'https://ahooks.js.org/',
  },
  locales: [
    { id: 'en-US', name: 'English' },
    { id: 'zh-CN', name: '中文' },
  ],
  favicons: ['/simple-logo.svg'],
  themeConfig: {
    logo: '/logo.svg',
    title: 'ahooks',
    description: {
      'en-US': 'A high-quality & reliable React Hooks library',
      'zh-CN': '一套高质量可靠的 React Hooks 库',
    },
    actions: {
      'en-US': [
        { text: 'Guide', link: '/guide', type: 'primary' },
        { text: 'Hooks List', link: '/hooks/index' },
      ],
      'zh-CN': [
        { text: '指南', link: '/guide', type: 'primary' },
        { text: 'Hooks 列表', link: '/hooks/index' },
      ],
    },
    features: {
      'en-US': [
        { title: 'Easy to learn and use' },
        { title: 'Supports SSR' },
        { title: 'Special treatment for functions, avoid closure problems' },
        {
          title:
            'Contains a large number of advanced Hooks that are refined from business scenarios',
        },
        { title: 'Contains a comprehensive collection of basic Hooks' },
        { title: 'Written in TypeScript with predictable static types' },
      ],
      'zh-CN': [
        { title: '易学易用' },
        { title: '支持 SSR' },
        { title: '对输入输出函数做了特殊处理，避免闭包问题' },
        { title: '包含大量提炼自业务的高级 Hooks' },
        { title: '包含丰富的基础 Hooks' },
        { title: '使用 TypeScript 构建，提供完整的类型定义文件' },
      ],
    },
    rtl: true,
    socialLinks: {
      github: 'https://github.com/alibaba/hooks',
    },
    prefersColor: {
      default: 'light',
      switch: true,
    },
    docVersions: {
      [packages.version]: '',
      'v2.x': 'https://ahooks-v2.js.org/',
      'v1.x': 'http://hooks.umijs.org/',
    },
    localesEnhance: [
      { id: 'zh-CN', switchPrefix: '中' },
      { id: 'en-US', switchPrefix: 'EN' },
    ],
    nav: {
      'en-US': [
        { title: 'Guide', link: '/guide' },
        { title: 'Hooks', link: '/hooks/index' },
        { title: 'Blog', link: '/blog/function' },
        { title: 'Releases', link: 'https://github.com/alibaba/hooks/releases' },
        { title: 'Mirror', link: 'https://ahooks.gitee.io/zh-CN' },
      ],
      'zh-CN': [
        { title: '指南', link: '/zh-CN/guide' },
        { title: 'Hooks', link: '/zh-CN/hooks/index' },
        { title: '博客', link: '/zh-CN/blog/function' },
        { title: '更新日志', link: 'https://github.com/alibaba/hooks/releases' },
        { title: '国内镜像', link: 'https://ahooks.gitee.io/zh-CN' },
      ],
    },
    footer:
      'Open-source MIT Licensed | Copyright © 2019-present<br />Powered by <a href="https://d.umijs.org" target="_blank">dumi</a>',
  },
  links: [
    // Used by the `useFusionTable` demo
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  scripts: [
    `const insertVersion = function() {
      const logo = document.querySelector('.__dumi-default-navbar-logo');
      if (!logo) return;
      const dom = document.createElement('span');
      dom.id = 'logo-version';
      dom.innerHTML = '${packages.version}';
      logo.parentNode.insertBefore(dom, logo.nextSibling);
    };
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const logoVersion = document.querySelector('#logo-version');
          if (logoVersion) {
            observer.disconnect();
          } else {
            insertVersion();
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });`,
  ],
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
  // https://github.com/alibaba/hooks/issues/2155
  extraBabelIncludes: ['filter-obj'],
});
