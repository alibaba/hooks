import { renderHook } from '@testing-library/react-hooks';
import useClickAway from '../index';

describe('useClickAway', () => {
  it('should be defined', () => {
    expect(useClickAway).toBeDefined();
  });

  let container1: HTMLDivElement;
  let container2: HTMLDivElement;
  let container3: HTMLDivElement;

  beforeEach(() => {
    container1 = document.createElement('div');
    container2 = document.createElement('div');
    container3 = document.createElement('div');
    container1.setAttribute('id', 'ele');
    document.body.appendChild(container1);
    document.body.appendChild(container2);
    document.body.appendChild(container3);
  });

  afterEach(() => {
    document.body.removeChild(container1);
    document.body.removeChild(container2);
    document.body.removeChild(container3);
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

    rerender('ele');
    container1.click();
    expect(state).toEqual(0);
    document.body.click();
    expect(state).toEqual(1);

    rerender(container2);
    container2.click();
    expect(state).toEqual(1);
    document.body.click();
    expect(state).toEqual(2);

    rerender(() => container3);
    container3.click();
    expect(state).toEqual(2);
    document.body.click();
    expect(state).toEqual(3);

    unmount();
    document.body.click();
    expect(state).toEqual(3);
  });
});
