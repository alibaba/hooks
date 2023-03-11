import React from 'react';
import { render } from '@testing-library/react';
import type { MemoryRouterProps } from 'react-router';
import { MemoryRouter, useLocation } from 'react-router';
import useUrlState from '..';
import type { Options } from '..';

export const setup = (
  initialEntries: MemoryRouterProps['initialEntries'],
  initialState: any = {},
  options?: Options,
) => {
  const res = {} as any;

  const Component = () => {
    const [state, setState] = useUrlState(initialState, options);
    const location = useLocation();
    Object.assign(res, { state, setState, location });
    return null;
  };

  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Component />
    </MemoryRouter>,
  );

  return res;
};

it('useUrlState should be defined', () => {
  expect(useUrlState).toBeDefined();
});
