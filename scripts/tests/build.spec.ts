import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import React from 'react';
import { renderToString } from 'react-dom/server';
import ts from 'typescript';
import { test } from 'vitest';

interface MetadataFunction {
  name: string;
  docs: string;
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url);
const packages = ['hooks', 'use-url-state'];
const loadBrowserBundle = (
  name: string,
  filename: string,
  environment: Record<string, unknown> = {},
) => {
  const context = {
    ...environment,
    React,
    URL,
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    window: undefined as unknown,
    self: undefined as unknown,
  };
  context.window = context;
  context.self = context;
  vm.createContext(context);
  vm.runInContext(
    readFileSync(path.join(root, 'packages', name, 'dist', filename), 'utf8'),
    context,
  );
  return context as typeof context & {
    ahooks: typeof import('../../packages/hooks/src');
    ahooksJsUseUrlState: { default: typeof import('../../packages/use-url-state/src').default };
  };
};

for (const name of packages) {
  test(`${name}: ESM and CommonJS expose matching exports and deep imports`, async () => {
    const dir = path.join(root, 'packages', name);
    const cjs = require(path.join(dir, 'lib/index.js'));
    const esm = await import(path.join(dir, 'es/index.js'));
    assert.deepEqual(Object.keys(esm).sort(), Object.keys(cjs).sort());
    if (name === 'hooks') {
      assert.equal(typeof esm.useRequest, 'function');
      assert.equal(typeof require(path.join(dir, 'lib/useBoolean')).default, 'function');
      assert.equal(
        typeof (await import(path.join(dir, 'es/useBoolean/index.js'))).default,
        'function',
      );
    } else {
      assert.equal(typeof esm.default, 'function');
    }
    assert.ok(existsSync(path.join(dir, 'es/index.d.ts')));
    assert.ok(existsSync(path.join(dir, 'lib/index.d.ts')));
  });
}

test('UMD exposes the existing globals, uses external React and supports Node', () => {
  const browser = loadBrowserBundle('hooks', 'ahooks.js');
  assert.equal(typeof browser.ahooks.useRequest, 'function');
  const Demo = () => {
    const [value] = browser.ahooks.useBoolean(true);
    return React.createElement('span', null, String(value));
  };
  assert.equal(renderToString(React.createElement(Demo)), '<span>true</span>');
  assert.equal(
    typeof require(path.join(root, 'packages/hooks/dist/ahooks.js')).useBoolean,
    'function',
  );
  const url = loadBrowserBundle('use-url-state', 'ahooks.js-use-url-state.js');
  assert.equal(typeof url.ahooksJsUseUrlState.default, 'function');
  assert.equal(
    typeof require(path.join(root, 'packages/use-url-state/dist/ahooks.js-use-url-state.js'))
      .default,
    'function',
  );
});

test('UMD keeps browser detection active when a DOM is available', () => {
  const browser = loadBrowserBundle('hooks', 'ahooks.js', {
    document: {
      createElement: () => ({ style: {} }),
      addEventListener: () => {},
      visibilityState: 'visible',
    },
    navigator: { onLine: true },
    innerWidth: 1280,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
  const Demo = () => React.createElement('span', null, String(browser.ahooks.useResponsive().xl));
  assert.equal(renderToString(React.createElement(Demo)), '<span>true</span>');
});

test('UMD supports AMD loaders with React supplied by the loader', () => {
  for (const [name, filename] of [
    ['hooks', 'ahooks.js'],
    ['use-url-state', 'ahooks.js-use-url-state.js'],
  ]) {
    let result: unknown;
    const define = Object.assign(
      (dependencies: string[], factory: (react: typeof React) => unknown) => {
        assert.deepEqual(Array.from(dependencies), ['react']);
        result = factory(React);
      },
      { amd: {} },
    );
    const context = { define, URL, console, setTimeout, clearTimeout, setInterval, clearInterval };
    vm.createContext(context);
    vm.runInContext(
      readFileSync(path.join(root, 'packages', name, 'dist', filename), 'utf8'),
      context,
    );
    assert.ok(result && typeof result === 'object');
    const exports = result as Record<string, unknown>;
    assert.equal(typeof exports[name === 'hooks' ? 'useBoolean' : 'default'], 'function');
  }
});

test('published declarations resolve for root and deep imports', () => {
  const fixture = mkdtempSync(path.join(root, '.build-types-'));
  try {
    const filename = path.join(fixture, 'consumer.ts');
    writeFileSync(
      filename,
      `
      import { useBoolean, useRequest } from '../packages/hooks/lib';
      import useBooleanDeep from '../packages/hooks/es/useBoolean';
      import useUrlState from '../packages/use-url-state/lib';
      const [value, actions] = useBoolean(true);
      const booleanValue: boolean = value;
      actions.setFalse();
      useBooleanDeep(false);
      const result = useRequest(async (id: number) => ({ id }), { manual: true });
      result.run(1);
      const id: number | undefined = result.data?.id;
      const [query, setQuery] = useUrlState({ search: '' });
      setQuery({ search: query.search });
      void booleanValue; void id;
    `,
    );
    const program = ts.createProgram([filename], {
      noEmit: true,
      strict: true,
      skipLibCheck: true,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ES2015,
      types: [],
    });
    const diagnostics = ts.getPreEmitDiagnostics(program);
    assert.equal(
      diagnostics.length,
      0,
      diagnostics.map((item) => ts.flattenDiagnosticMessageText(item.messageText, '\n')).join('\n'),
    );
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('metadata retains the hook catalogue and public docs URLs', () => {
  const metadata: { functions: MetadataFunction[] } = JSON.parse(
    readFileSync(path.join(root, 'packages/hooks/metadata.json'), 'utf8'),
  );
  assert.ok(metadata.functions.length > 70);
  const booleanMetadata = metadata.functions.find((item) => item.name === 'useBoolean');
  assert.ok(booleanMetadata);
  assert.equal(booleanMetadata.docs, 'https://ahooks.js.org/hooks/use-boolean');
});
