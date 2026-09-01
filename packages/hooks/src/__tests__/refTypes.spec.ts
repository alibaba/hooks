import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, test } from 'vitest';

const emitDeclaration = (sourceFile: string) => {
  let declaration = '';
  const program = ts.createProgram([sourceFile], {
    declaration: true,
    emitDeclarationOnly: true,
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
    strictNullChecks: true,
    target: ts.ScriptTarget.ES2015,
    types: [],
  });

  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length > 0) {
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (fileName) => fileName,
        getCurrentDirectory: () => process.cwd(),
        getNewLine: () => '\n',
      }),
    );
  }

  const emitResult = program.emit(undefined, (fileName, text) => {
    if (fileName.endsWith('.d.ts')) {
      declaration = text;
    }
  });

  expect(emitResult.emitSkipped).toBe(false);
  return declaration;
};

describe('ref return type declarations', () => {
  test.each([
    [
      'useLatest',
      '../useLatest/index.ts',
      'declare function useLatest<T>(value: T): MutableRefObject<T>;',
    ],
    [
      'useUnmountedRef',
      '../useUnmountedRef/index.tsx',
      'declare const useUnmountedRef: () => MutableRefObject<boolean>;',
    ],
  ])('%s should expose a non-nullable mutable ref', (_hook, sourcePath, expected) => {
    const sourceFile = fileURLToPath(new URL(sourcePath, import.meta.url));
    expect(emitDeclaration(sourceFile)).toContain(expected);
  });
});
