import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'vitest';

interface Route {
  path: string;
  file?: string;
  redirect?: string;
}
interface SidebarGroup {
  children: { link: string }[];
}
interface DocsBuild {
  routes: Record<string, Route>;
  config: {
    base: string;
    publicPath: string;
    themeConfig: { sidebar: Record<string, SidebarGroup[]> };
  };
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const build: DocsBuild = JSON.parse(
  readFileSync(path.join(root, '.dumi/tmp-production/appData.json'), 'utf8'),
);
const routes = Object.values(build.routes);
const routePaths = new Set(
  routes.map((route) => '/' + route.path.replace(/^\//, '').replace(/\/$/, '')),
);

const htmlPath = (route: Route) =>
  path.join(root, 'dist', route.path.replace(/^\//, ''), 'index.html');

test('every bilingual Markdown route is exported, with no duplicate URLs', () => {
  const markdown = routes.filter((route) => route.file?.endsWith('.md'));
  assert.ok(markdown.length >= 188, `Only ${markdown.length} Markdown routes were found`);
  assert.equal(new Set(markdown.map((route) => route.path)).size, markdown.length);
  for (const route of markdown) assert.ok(existsSync(htmlPath(route)), `Missing ${route.path}`);
});

test('nested request URLs, URL state and legacy Hooks entrypoints remain available', () => {
  for (const prefix of ['', '/zh-CN']) {
    for (const suffix of [
      '/hooks/use-request',
      '/hooks/use-request/basic',
      '/hooks/use-request/cache',
      '/hooks/use-request/refresh-deps',
      '/hooks/use-url-state',
      '/hooks/use-boolean',
      '/hooks/use-antd-table',
    ]) {
      assert.ok(routePaths.has(prefix + suffix), `Missing ${prefix + suffix}`);
    }
    const entry = routes.find((route) => '/' + route.path === prefix + '/hooks');
    assert.equal(entry?.redirect, prefix + '/hooks/use-request');
  }
});

test('all custom sidebar links point to real documentation routes', () => {
  for (const groups of Object.values(build.config.themeConfig.sidebar)) {
    for (const group of groups) {
      for (const item of group.children)
        assert.ok(routePaths.has(item.link), `Broken sidebar link ${item.link}`);
    }
  }
});

test('HTML assets respect the configured root or GitHub Pages base', () => {
  assert.equal(build.config.base, build.config.publicPath);
  const html = readFileSync(path.join(root, 'dist/index.html'), 'utf8');
  const localAssets = [...html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|svg))"/g)]
    .map((match) => match[1])
    .filter((url) => url.startsWith('/'));
  assert.ok(localAssets.length > 0);
  for (const url of localAssets) {
    assert.ok(url.startsWith(build.config.publicPath), `Incorrect asset base: ${url}`);
    const filename = url.slice(build.config.publicPath.length);
    assert.ok(existsSync(path.join(root, 'dist', filename)), `Missing asset ${url}`);
  }
});
