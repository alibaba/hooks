import { renderHook, act } from '@testing-library/react-hooks';
import useKeyPress, { KeyFilter, EventHandler, keyEvent } from '../index';

interface Props {
  keyFilter: KeyFilter;
  eventHandler: EventHandler;
}

describe('useKeyPress', () => {
  it('should be defined', () => {
    expect(useKeyPress).toBeDefined();
  });

  it('test on mounted', async () => {
    const { rerender, unmount } = renderHook(
      (props: Props) => useKeyPress(props.keyFilter, props.eventHandler),
      {
        initialProps: {
          keyFilter: 'a',
          eventHandler: (event) => {},
        },
      },
    );
  });
});
