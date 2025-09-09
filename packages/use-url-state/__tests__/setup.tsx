import { render } from '@testing-library/react';
import type { MemoryRouterProps } from 'react-router';
import { MemoryRouter, useLocation } from 'react-router';
import type { Options } from 'src';
import useUrlState from 'src';
import { expect, test } from 'vitest';

export const setup = (
  initialEntries: MemoryRouterProps['initialEntries'],
  baseState: any = {},
  options?: Options,
) => {
  const res = {} as any;

  const Component = () => {
    const [state, setState] = useUrlState(baseState, options);
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

test('useUrlState should be defined', () => {
  expect(useUrlState).toBeDefined();
});
