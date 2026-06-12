import { act } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { setup } from './setup';

describe('React Router V6', () => {
  test('useUrlState should be work', () => {
    const res = setup(['/index']);
    act(() => {
      res.setState({ count: 1 });
    });

    expect(res.state).toMatchObject({ count: '1' });
  });
});
