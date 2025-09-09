import { act } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { setup } from './setup';

describe('useUrlState', () => {
  test('state should be url search params', () => {
    const res = setup([
      {
        pathname: '/index',
        search: '?count=1',
      },
    ]);
    expect(res.state).toMatchObject({ count: '1' });
  });

  test('url shoule be changed when use setState', () => {
    const res = setup(['/index']);
    expect(res.state).toMatchObject({});
    act(() => {
      res.setState({ count: 1 });
    });
    expect(res.state).toMatchObject({ count: '1' });
  });

  test('multiple states should be work', () => {
    const res = setup(['/index']);
    act(() => {
      res.setState({ page: 1 });
    });
    act(() => {
      res.setState({ pageSize: 10 });
    });
    expect(res.state).toMatchObject({ page: '1', pageSize: '10' });
  });

  test('query-string options should work', async () => {
    const res = setup(
      [
        {
          pathname: '/index',
          search: '?foo=1,2,3',
        },
      ],
      {},
      {
        parseOptions: {
          arrayFormat: 'comma',
        },
        stringifyOptions: {
          arrayFormat: 'comma',
        },
      },
    );
    expect(res.state).toMatchObject({ foo: ['1', '2', '3'] });

    act(() => {
      res.setState({ foo: ['4', '5', '6'] });
    });
    expect(res.state).toMatchObject({ foo: ['4', '5', '6'] });
  });

  test('location.state should be remain', () => {
    const res = setup([
      {
        pathname: '/index',
        state: 'state',
      },
    ]);
    expect(res.location.state).toBe('state');
    act(() => {
      res.setState({ count: 1 });
    });
    expect(res.state).toMatchObject({ count: '1' });
    expect(res.location.state).toBe('state');
  });
});
