import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'dumi';
import { menus } from './config/hooks';

const publicPath =
  `/${(process.env.DOCS_PUBLIC_PATH || '/').split('/').filter(Boolean).join('/')}/`.replace(
    /^\/\/$/,
    '/',
  );
const asset = (filename: string) => `${publicPath}${filename}`;
const kebabCase = (name: string) => name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const createHookSidebar = (locale: string) =>
  menus.map((group) => ({
    title: group.title,
    children: group.children.map((name) => {
      const isRequest = name.startsWith('useRequest/doc/');
      let title = name === 'use-url-state' ? 'useUrlState' : name;
      if (isRequest) {
        const directory = path.resolve(__dirname, 'packages/hooks/src', name);
        const file = readdirSync(directory).find((filename) => filename.endsWith(`.${locale}.md`));
        if (file)
          title = readFileSync(path.join(directory, file), 'utf8').match(/^# (.+)$/m)?.[1] || name;
      }
      return {
        title,
        link: isRequest
          ? `/hooks/use-request${name.endsWith('/index') ? '' : `/${kebabCase(name.split('/').at(-1) || '')}`}`
          : `/hooks/${kebabCase(name)}`,
      };
    }),
  }));
const hookSidebar = createHookSidebar('en-US');
const chineseHookSidebar = createHookSidebar('zh-CN');
const localizeSidebar = (groups: typeof hookSidebar, prefix: string) =>
  groups.map((group) => ({
    ...group,
    children: group.children.map((item) => ({ ...item, link: `${prefix}${item.link}` })),
  }));
const guideSidebar = (locale: string) => [
  {
    title: locale === 'zh-CN' ? '指南' : 'Guide',
    children: [
      { title: locale === 'zh-CN' ? '介绍' : 'Introduction', link: '/guide' },
      { title: 'v2 → v3', link: '/guide/upgrade' },
      { title: locale === 'zh-CN' ? 'DOM 类 Hooks 使用规范' : 'DOM Hooks', link: '/guide/dom' },
      { title: 'Functions', link: '/guide/blog/function' },
      { title: 'SSR', link: '/guide/blog/ssr' },
      { title: 'HMR', link: '/guide/blog/hmr' },
      { title: 'StrictMode', link: '/guide/blog/strict' },
    ],
  },
];

export default defineConfig({
  title: 'ahooks',
  plugins: ['./.dumi/plugin.ts'],
  favicons: [asset('simple-logo.svg')],
  base: publicPath,
  publicPath,
  hash: true,
  outputPath: process.env.NODE_ENV === 'development' ? '.dumi/dev-dist' : 'dist',
  exportStatic: {},
  utoopack: {
    cacheDirectory:
      process.env.NODE_ENV === 'development' ? '.dumi/cache-dev' : '.dumi/cache-production',
  },
  autoAlias: false,
  locales: [
    { id: 'en-US', name: 'English', base: '/' },
    { id: 'zh-CN', name: '中文', base: '/zh-CN' },
  ],
  alias: {
    ahooks: path.resolve(__dirname, 'packages/hooks/src/index.ts'),
    '@ahooks.js/use-url-state': path.resolve(__dirname, 'packages/use-url-state/src/index.ts'),
  },
  resolve: {
    docDirs: ['docs', { dir: 'packages/hooks/src/useRequest/doc', type: 'request-doc' }],
    atomDirs: [
      { type: 'hook', dir: 'packages/hooks/src' },
      { type: 'hook', dir: 'packages/use-url-state' },
    ],
    forceKebabCaseRouting: true,
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: asset('style.css') },
  ],
  themeConfig: {
    name: 'ahooks',
    logo: asset('logo.svg'),
    prefersColor: { default: 'auto' },
    socialLinks: { github: 'https://github.com/alibaba/hooks' },
    footer: 'Open-source MIT Licensed | Copyright © 2019-present',
    nav: {
      'en-US': [
        { title: 'Guide', link: '/guide' },
        { title: 'Hooks', link: '/hooks/use-request' },
        {
          title: 'Legacy Versions',
          children: [
            { title: 'v2.x', link: 'https://ahooks-v2.js.org/' },
            { title: 'v1.x', link: 'http://hooks.umijs.org/' },
          ],
        },
        { title: 'Releases', link: 'https://github.com/alibaba/hooks/releases' },
        { title: 'Mirror', link: 'https://alibaba.github.io/hooks/' },
      ],
      'zh-CN': [
        { title: '指南', link: '/zh-CN/guide' },
        { title: 'Hooks', link: '/zh-CN/hooks/use-request' },
        {
          title: '历史版本',
          children: [
            { title: 'v2.x', link: 'https://ahooks-v2.js.org/' },
            { title: 'v1.x', link: 'http://hooks.umijs.org/' },
          ],
        },
        { title: '更新日志', link: 'https://github.com/alibaba/hooks/releases' },
        { title: '备用镜像', link: 'https://alibaba.github.io/hooks/' },
      ],
    },
    sidebar: {
      '/guide': guideSidebar('en-US'),
      '/zh-CN/guide': localizeSidebar(guideSidebar('zh-CN'), '/zh-CN'),
      '/hooks': hookSidebar,
      '/hooks/use-request': hookSidebar,
      '/zh-CN/hooks': localizeSidebar(chineseHookSidebar, '/zh-CN'),
      '/zh-CN/hooks/use-request': localizeSidebar(chineseHookSidebar, '/zh-CN'),
    },
  },
});
