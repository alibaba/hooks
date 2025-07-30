import { describe, expect, test, vi } from 'vitest';
import { useRef } from 'react';
import useFocusWithin, { Options } from '../index';
import { render, fireEvent } from '@testing-library/react';

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
  test('should call onFocus/onBlur', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const result = setup({ onFocus, onBlur });
    fireEvent.focusIn(result.getByLabelText('First Name'));
    expect(onFocus).toBeCalled();
    fireEvent.focusOut(result.getByLabelText('First Name'));
    expect(onBlur).toBeCalled();
  });

  test('should call onChange', () => {
    const onChange = vi.fn();
    const result = setup({ onChange });
    fireEvent.focusIn(result.getByLabelText('First Name'));
    expect(onChange).toBeCalledWith(true);
    fireEvent.focusOut(result.getByLabelText('First Name'));
    expect(onChange).toHaveBeenLastCalledWith(false);
  });
});
