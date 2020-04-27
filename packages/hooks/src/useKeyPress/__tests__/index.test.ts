import { renderHook, act } from '@testing-library/react-hooks';
import useKeyPress, { KeyFilter, EventHandler, keyEvent } from '../index';

interface Props {
  keyFilter: KeyFilter;
  eventHandler: EventHandler;
  events: Array<keyEvent>;
}

describe('useKeyPress', () => {
  it('should be defined', () => {
    expect(useKeyPress).toBeDefined();
  });

  it('test on mounted', async () => {
    const { rerender, unmount } = renderHook(
      (props: Props) => useKeyPress(props.keyFilter, props.eventHandler, props.events),
      {
        initialProps: {
          keyFilter: 'a',
          eventHandler: event => {},
          events: ['keydown'],
        },
      },
    );
  });

  it('test keyCode is undefined', async () => {
    let msg = ''
    renderHook(
      () => useKeyPress('meta.e', e => {
        msg = 'keypress meta.e'
      })
    )
    act(() => {
      const ev = document.createEvent('Events');
      ev.initEvent('keydown', true, true);
      document.dispatchEvent(ev);
    })
    expect(msg).toEqual('')
  });
});
