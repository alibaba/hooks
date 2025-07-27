import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { useRef } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import useFocusWithin, { type Options } from '../index';

const setup = (options?: Options) => {
  const TestComponent = () => {
    const ref = useRef(null);
    const isFocusWithin = useFocusWithin(ref, options);
    return (
      <div ref={ref}>
        <label>
          First Name
          <input />
        </label>
        <label>
          Last Name
          <input />
        </label>
        <p>isFocusWithin: {JSON.stringify(isFocusWithin)}</p>
      </div>
    );
  };

  return render(<TestComponent />);
};

describe('useFocusWithin', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  test('should call onFocus/onBlur', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const result = setup({ onFocus, onBlur });
    fireEvent.focusIn(result.getAllByLabelText('First Name')[0]);
    expect(onFocus).toBeCalled();
    fireEvent.focusOut(result.getAllByLabelText('First Name')[0]);
    expect(onBlur).toBeCalled();
  });

  test('should call onChange', () => {
    const onChange = vi.fn();
    const result = setup({ onChange });
    fireEvent.focusIn(result.getAllByLabelText('First Name')[0]);
    expect(onChange).toBeCalledWith(true);
    fireEvent.focusOut(result.getAllByLabelText('First Name')[0]);
    expect(onChange).toHaveBeenLastCalledWith(false);
  });
});
