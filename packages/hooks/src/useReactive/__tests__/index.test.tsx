import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Demo from '../demo';
import { sleep } from '../../utils/testingHelpers';
import { act } from 'react-dom/test-utils';

describe('test useReactive feature', () => {
  it('test count ', () => {
    let wrap = render(<Demo />);

    let count = wrap.getByRole('addCount');
    let addCountBtn = wrap.getByRole('addCountBtn');
    let subCountBtn = wrap.getByRole('subCountBtn');

    act(() => {
      fireEvent.click(addCountBtn);
    });
    expect(count.textContent).toBe('1');

    act(() => {
      fireEvent.click(addCountBtn);
      fireEvent.click(addCountBtn);
    });
    expect(count.textContent).toBe('3');

    act(() => {
      fireEvent.click(subCountBtn);
    });
    expect(count.textContent).toBe('2');

    act(() => {
      fireEvent.click(subCountBtn);
      fireEvent.click(subCountBtn);
      fireEvent.click(subCountBtn);
      fireEvent.click(subCountBtn);
      fireEvent.click(subCountBtn);
    });
    expect(count.textContent).toBe('-3');
  });

  it('test array', () => {
    let wrap = render(<Demo />);
    let testArray = wrap.getByRole('test-array');
    let pushbtn = wrap.getByRole('pushbtn');
    let popbtn = wrap.getByRole('popbtn');
    let shiftbtn = wrap.getByRole('shiftbtn');
    let unshiftbtn = wrap.getByRole('unshiftbtn');
    act(() => {
      fireEvent.click(pushbtn);
    });
    expect(JSON.parse(testArray.textContent as any).length).toBe(2);
    act(() => {
      fireEvent.click(popbtn);
    });
    expect(JSON.parse(testArray.textContent as any).length).toBe(1);
    act(() => {
      fireEvent.click(unshiftbtn);
    });
    expect(JSON.parse(testArray.textContent as any).length).toBe(2);
    act(() => {
      fireEvent.click(shiftbtn);
    });
    expect(JSON.parse(testArray.textContent as any).length).toBe(1);
  });

  it('test input1', () => {
    let wrap = render(<Demo />);

    let input = wrap.getByRole('input1');
    let inputVal = wrap.getByRole('inputVal1');
    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });
    expect(inputVal.textContent).toBe('a');

    act(() => {
      fireEvent.change(input, { target: { value: 'bbb' } });
    });
    expect(inputVal.textContent).toBe('bbb');
  });

  it('test debounce', async () => {
    let wrap = render(<Demo />);

    let input = wrap.getByRole('debounceInput');
    let inputVal = wrap.getByRole('debounceVal');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'abc' } });
      await sleep(200);
    });
    expect(inputVal.textContent).toBe('');
    await act(async () => {
      await sleep(200);
    });
    expect(inputVal.textContent).toBe('abc');
  });

  it('test throttle', async () => {
    let wrap = render(<Demo />);

    let input = wrap.getByRole('throttleInput');
    let inputVal = wrap.getByRole('throttleVal');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'aaa' } });
      await sleep(300);
    });

    expect(inputVal.textContent).toBe('aaa');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'bbb' } });
      await sleep(300);
    });
    expect(inputVal.textContent).toBe('bbb');
  });
});
