export default {
  // ssr: {},
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
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
  mode: 'site',
  title: 'ahooks',
  favicon: '/simple-logo.svg',
  logo: '/logo.svg',
  dynamicImport: {},
  runtimePublicPath: true,
  manifest: {},
  links: [{ rel: 'manifest', href: '/asset-manifest.json' }],
  hash: true,
  resolve: {
    includes: ['docs', 'packages/hooks/src', 'packages/use-request', 'packages/use-url-state'],
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  navs: {
    'zh-CN': [
      null,
      {
        title: '生态',
        children: [
          {
            title: 'useTable',
            path: 'https://usetable-ahooks.js.org/',
          },
        ],
      },
      { title: 'v1.x', path: 'http://hooks.umijs.org/' },
      { title: 'GitHub', path: 'https://github.com/alibaba/hooks' },
      { title: '更新日志', path: 'https://github.com/alibaba/hooks/releases' },
      { title: '国内镜像', path: 'https://ahooks.gitee.io/zh-CN' },
    ],
    'en-US': [
      null,
      {
        title: 'Ecosystem',
        children: [
          {
            title: 'useTable',
            path: 'https://usetable-ahooks.js.org/',
          },
        ],
      },
      { title: 'v1.x', path: 'http://hooks.umijs.org/' },
      { title: 'GitHub', path: 'https://github.com/alibaba/hooks' },
      { title: 'Changelog', path: 'https://github.com/alibaba/hooks/releases' },
      { title: '国内镜像', path: 'https://ahooks.gitee.io/zh-CN' },
    ],
  },
  headScripts: [
    'https://s4.cnzz.com/z_stat.php?id=1278992092&web_id=1278992092',
    `
    let notice = document.createElement('div');
    notice.className = 'notice';
    notice.innerHTML = '<div class="notice-content">ahooks 3.0 is comming! welcome to try it <a href="https://ahooks-next.surge.sh/" target="_blank">https://ahooks-next.surge.sh/</a></div>';
    document.body.appendChild(notice);
  `,
    `
  if(window.location.pathname.indexOf('/ahooks-v2') > -1) {
    window.routerBase = '/ahooks-v2/'
  }
  `,
  ],
  hire: {
    title: '招招招招招前端！！！！',
    content: `
<ul>
  <li>ahooks、qiankun、antd mobile、l7 各种开源项目，快来并肩作战！</li>
  <li>小组介绍：<a href="https://www.yuque.com/docs/share/8f763b3f-acd8-4ebf-a443-a0f45c5db293?#" target="_blank">http://topurl.cn/8wP</a></li>
  <li>投递邮箱：brickspert.fjl@antfin.com</li>
</ul>`,
    email: 'brickspert.fjl@antfin.com',
    slogan: '招招招招招前端！！！！',
  },
};
