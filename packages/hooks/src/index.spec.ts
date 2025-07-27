import { describe, expect, test } from 'vitest';
import * as ahooks from '.';

describe('ahooks', () => {
  test('exports modules should be defined', () => {
    Object.keys(ahooks).forEach((module) => {
      expect(ahooks[module]).toBeDefined();
    });
  });
});
