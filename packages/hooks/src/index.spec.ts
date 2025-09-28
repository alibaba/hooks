import { describe, expect, test } from 'vitest';
import * as ahooks from '.';

describe('ahooks', () => {
  test('exports modules should be defined', () => {
    Object.entries(ahooks).forEach(([key, value]) => {
      expect(value).toBeDefined();
    });
  });
});
