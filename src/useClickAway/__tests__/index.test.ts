import { renderHook } from '@testing-library/react-hooks';
import useClickAway from '../index';

describe('useClickAway', () => {
  it('should be defined', () => {
    expect(useClickAway).toBeDefined();
  });

  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('id', 'ele');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('test on dom optional', async () => {
    let state: number = 0;
    const { rerender, unmount } = renderHook((dom: any) =>
      useClickAway(() => {
        state++;
      }, dom),
    );

    document.body.click();
    expect(state).toEqual(0);

    rerender(() => container);
    container.click();
    expect(state).toEqual(0);
    document.body.click();
    expect(state).toEqual(1);

    unmount();
    document.body.click();
    expect(state).toEqual(1);
  });
});
