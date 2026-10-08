import { existsSync } from 'node:fs';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { template, transformAsync, types } from '@babel/core';
import { build } from '@utoo/pack';
import matter from 'gray-matter';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageDir = process.cwd();
const manifest = JSON.parse(await readFile(path.join(packageDir, 'package.json'), 'utf8'));
const require = createRequire(path.join(packageDir, 'package.json'));

if (!['ahooks', '@ahooks.js/use-url-state'].includes(manifest.name) || packageDir === root) {
  throw new Error('Run this build from an ahooks package directory.');
}

for (const directory of ['es', 'lib', 'dist']) {
  await rm(path.join(packageDir, directory), { recursive: true, force: true });
}

const configPath = path.join(packageDir, 'tsconfig.pro.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
const parsed = ts.parseJsonConfigFileContent(
  config.config,
  ts.sys,
  packageDir,
  {
    outDir: path.join(packageDir, 'es'),
    module: ts.ModuleKind.ESNext,
    declaration: true,
    noEmit: false,
  },
  configPath,
);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
if (diagnostics.length) {
  throw new Error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => packageDir,
      getNewLine: () => '\n',
    }),
  );
}
const emitted = program.emit();
if (emitted.emitSkipped) throw new Error('TypeScript compilation did not emit the package.');

async function* files(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* files(filename);
    else yield filename;
  }
}

// Keep each source module independently importable, including native Node ESM.
function esmImports() {
  return {
    visitor: {
      'ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration'(nodePath, state) {
        const source = nodePath.node.source;
        if (!source) return;
        if (source.value.startsWith('.')) {
          const resolved = path.resolve(path.dirname(state.filename), source.value);
          if (existsSync(`${resolved}.js`)) source.value += '.js';
          else if (existsSync(path.join(resolved, 'index.js'))) source.value += '/index.js';
        } else if (source.value.startsWith('lodash/')) {
          source.value += '.js';
        }
      },
    },
  };
}

for await (const filename of files(path.join(packageDir, 'es'))) {
  const relative = path.relative(path.join(packageDir, 'es'), filename);
  const cjsFilename = path.join(packageDir, 'lib', relative);
  await mkdir(path.dirname(cjsFilename), { recursive: true });
  if (filename.endsWith('.js')) {
    const source = await readFile(filename, 'utf8');
    const commonOptions = { filename, babelrc: false, configFile: false };
    const esm = await transformAsync(source, { ...commonOptions, plugins: [esmImports] });
    const cjs = await transformAsync(source, {
      ...commonOptions,
      plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
    });
    if (!esm?.code || !cjs?.code) throw new Error(`Failed to transform ${filename}`);
    await writeFile(filename, esm.code + '\n');
    await writeFile(cjsFilename, cjs.code + '\n');
  } else {
    await cp(filename, cjsFilename);
  }
}
await writeFile(path.join(packageDir, 'es/package.json'), '{"type":"module"}\n');
await writeFile(path.join(packageDir, 'lib/package.json'), '{"type":"commonjs"}\n');

const isHooks = manifest.name === 'ahooks';
// Preserve runtime environment checks in browser-target universal bundles.
await build(
  {
    config: {
      mode: 'production',
      define: { window: 'globalThis.window' },
      entry: [
        { import: './es/index.js', library: { name: isHooks ? 'ahooks' : 'ahooksJsUseUrlState' } },
      ],
      output: {
        path: './dist',
        filename: isHooks ? 'ahooks.js' : 'ahooks.js-use-url-state.js',
      },
      externals: { react: { root: 'React', commonjs: 'react' } },
    },
  },
  packageDir,
  root,
);

// Keep the previous AMD contract as well as browser and CommonJS consumers.
const libraryName = isHooks ? 'ahooks' : 'ahooksJsUseUrlState';
const bundlePath = path.join(
  packageDir,
  'dist',
  isHooks ? 'ahooks.js' : 'ahooks.js-use-url-state.js',
);
const bundle = (await readFile(bundlePath, 'utf8')).replace(/\n\/\/# sourceMappingURL=.*$/, '');
const sourceMap = JSON.parse(await readFile(`${bundlePath}.map`, 'utf8'));
const wrapped = await transformAsync(bundle, {
  filename: bundlePath,
  babelrc: false,
  configFile: false,
  compact: true,
  sourceMaps: true,
  inputSourceMap: sourceMap,
  plugins: [
    () => ({
      visitor: {
        Program: {
          exit(programPath) {
            const wrapper = template.statement(`
            (function(factory) {
              if (typeof define === 'function' && define.amd) define(['react'], factory);
              else if (typeof module === 'object' && module.exports) module.exports = factory(require('react'));
              else if (typeof exports === 'object') exports[%%LIBRARY%%] = factory(require('react'));
              else globalThis[%%LIBRARY%%] = factory(globalThis.React);
            })(function(React) {
              var module = { exports: {} };
              var exports = module.exports;
              var require = function(name) {
                if (name === 'react') return React;
                throw new Error('Unexpected external module: ' + name);
              };
              %%BODY%%
              return module.exports;
            });
          `)({ LIBRARY: types.stringLiteral(libraryName), BODY: programPath.node.body });
            programPath.node.body = [wrapper];
          },
        },
      },
    }),
  ],
});
if (!wrapped?.code || !wrapped.map) throw new Error(`Failed to wrap ${libraryName}`);
await writeFile(
  bundlePath,
  `${wrapped.code}\n//# sourceMappingURL=${path.basename(bundlePath)}.map\n`,
);
await writeFile(`${bundlePath}.map`, JSON.stringify(wrapped.map));

if (isHooks) {
  await cp(path.join(root, 'README.md'), path.join(packageDir, 'README.md'));
  const entries = await readdir(path.join(packageDir, 'src'), { withFileTypes: true });
  const functions = [];
  for (const entry of entries
    .filter((item) => item.isDirectory() && item.name.startsWith('use'))
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const filename = path.join(packageDir, 'src', entry.name, 'index.en-US.md');
    let description = '';
    if (existsSync(filename)) {
      const { content } = matter(await readFile(filename, 'utf8'));
      description = (
        content.replace(/\r\n/g, '\n').match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m)?.[1] || ''
      ).trim();
      description = description.charAt(0).toLowerCase() + description.slice(1);
    }
    functions.push({
      name: entry.name,
      docs: `https://ahooks.js.org/hooks/${entry.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
      description,
    });
  }
  await writeFile(
    path.join(packageDir, 'metadata.json'),
    JSON.stringify({ functions }, null, 2) + '\n',
  );
}
console.log(`Built ${manifest.name}: ESM, CommonJS, declarations and UMD.`);
