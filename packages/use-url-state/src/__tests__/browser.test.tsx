import React from 'react';
import { render } from '@testing-library/react';
import { act } from '@testing-library/react-hooks/dom';
import type { MemoryRouterProps } from 'react-router';
import { MemoryRouter } from 'react-router';
import * as rc from 'react-router';
import useUrlState from '..';
import type { Options } from '..';

const setup = (
  initialEntries: MemoryRouterProps['initialEntries'],
  initialState: any = {},
  options?: Options,
) => {
  const res = {} as any;

  const Component = () => {
    const [state, setState] = useUrlState(initialState, options);
    Object.assign(res, { state, setState });
    return null;
  };

  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Component />
    </MemoryRouter>,
  );

  return res;
};

describe('useUrlState', () => {
  it('should be defined', () => {
    expect(useUrlState).toBeDefined();
  });

  it('state should be url search params', () => {
    const res = setup([
      {
        pathname: '/index',
        search: '?count=1',
      },
    ]);
    expect(res.state).toMatchObject({ count: '1' });
  });

  it('url shoule be changed when use setState', () => {
    const res = setup(['/index']);
    expect(res.state).toMatchObject({});
    act(() => {
      res.setState({ count: 1 });
    });
    expect(res.state).toMatchObject({ count: '1' });
  });

  it('multiple states should be work', () => {
    const res = setup(['/index']);
    act(() => {
      res.setState({ page: 1 });
    });
    act(() => {
      res.setState({ pageSize: 10 });
    });
    expect(res.state).toMatchObject({ page: '1', pageSize: '10' });
  });

  it('query-string options should work', async () => {
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

  it('react router v5 should be work', () => {
    const push = jest.fn();

    Object.defineProperty(rc, 'useHistory', {
      value: () => ({ push }),
    });

    const res = setup(['/index']);
    act(() => {
      res.setState({ count: 1 });
    });

    expect(res.state).toMatchObject({ count: '1' });
    expect(push).toBeCalledWith({ hash: '', search: 'count=1' });
  });
});
