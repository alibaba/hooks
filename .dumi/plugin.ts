import type { IApi } from 'dumi';

/** Preserve the existing nested useRequest documentation URLs. */
export default function requestRoutes(api: IApi) {
  api.modifyRoutes({
    stage: 100,
    fn(routes) {
      for (const [id, route] of Object.entries(routes)) {
        if (route.file?.endsWith('/packages/use-url-state/README.md')) {
          delete routes[id];
          continue;
        }
        if (route.file?.includes('/useRequest/doc/')) {
          const topic = route.file.split('/useRequest/doc/')[1].split('/')[0];
          const locale = route.path.startsWith('zh-CN/') ? 'zh-CN/' : '';
          const slug = topic.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          route.path = `${locale}hooks/use-request${topic === 'index' ? '' : `/${slug}`}`;
          route.absPath = `/${route.path}`;
        }
      }
      for (const locale of ['', 'zh-CN/']) {
        const request = Object.values(routes).find(
          (route) => route.path === `${locale}hooks/use-request`,
        );
        if (request) {
          const id = `${locale}hooks-index`;
          routes[id] = {
            id,
            path: `${locale}hooks`,
            absPath: `/${locale}hooks`,
            parentId: request.parentId,
            redirect: `/${locale}hooks/use-request`,
          };
        }
      }
      return routes;
    },
  });
}
