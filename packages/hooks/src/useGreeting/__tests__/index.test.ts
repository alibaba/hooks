import { act, renderHook } from '@testing-library/react';
import { useSetState } from 'ahooks';
import type { GreetingsOptions } from '../index';
import useGreeting from '../index';

describe('useGreeting', () => {
  it('should work for different props', async () => {
    const hook = renderHook(() => {
      const [state, setState] = useSetState<GreetingsOptions>({
        prefix: '',
        suffix: '',
        transform: undefined,
      });
      return { greeting: useGreeting(state), setState };
    });
    expect(hook.result.current.greeting).toMatch(/^morning|afternoon|evening|night$/);

    await act(async () => {
      hook.result.current.setState({ prefix: 'Good' });
    });
    expect(hook.result.current.greeting).toMatch(
      /^Goodmorning|Goodafternoon|Goodevening|Goodnight$/,
    );

    await act(async () => {
      hook.result.current.setState({ prefix: '', suffix: '!' });
    });
    expect(hook.result.current.greeting).toMatch(/^morning!|afternoon!|evening!|night!$/);

    await act(async () => {
      hook.result.current.setState({ transform: 'uppercase' });
    });
    expect(hook.result.current.greeting).toMatch(/^MORNING!|AFTERNOON!|EVENING!|NIGHT!$/);

    await act(async () => {
      hook.result.current.setState({ transform: 'capitalizeFirstLetter' });
    });
    expect(hook.result.current.greeting).toMatch(/^Morning!|Afternoon!|Evening!|Night!$/);
  });
});
