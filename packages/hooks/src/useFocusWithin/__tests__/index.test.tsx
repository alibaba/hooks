import React, { useRef } from 'react';
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
  it('should call onFocus/onBlur', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const result = setup({ onFocus, onBlur });
    fireEvent.focusIn(result.getByLabelText('First Name'));
    expect(onFocus).toBeCalled();
    fireEvent.focusOut(result.getByLabelText('First Name'));
    expect(onBlur).toBeCalled();
  });

  it('should call onChange', () => {
    const onChange = jest.fn();
    const result = setup({ onChange });
    fireEvent.focusIn(result.getByLabelText('First Name'));
    expect(onChange).toBeCalledWith(true);
    fireEvent.focusOut(result.getByLabelText('First Name'));
    expect(onChange).toHaveBeenLastCalledWith(false);
  });
});
