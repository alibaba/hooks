import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useModal, ModalProvider } from '../index'; // 请根据实际路径导入组件

// 模拟一个用于测试的组件
const TestComponent = () => {
  const modal = useModal(TestModalComponent);

  return (
    <div>
      <button onClick={() => modal.show()}>Show Modal</button>
    </div>
  );
};

const TestModalComponent = ({ visible, hide, destroy }) => {
  return (
    <div data-testid="modal" style={{ display: visible ? 'block' : 'none' }}>
      <button data-testid="hide-button" onClick={hide}>
        Hide Modal
      </button>
      <button data-testid="destroy-button" onClick={destroy}>
        Destroy Modal
      </button>
    </div>
  );
};

describe('useModal and ModalProvider', () => {
  it('should show and hide modal', () => {
    const { getByText, getByTestId } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    const showModalButton = getByText('Show Modal');
    fireEvent.click(showModalButton);

    const modal = getByTestId('modal');
    expect(modal).toBeVisible();

    const hideButton = getByTestId('hide-button');
    fireEvent.click(hideButton);

    expect(modal).not.toBeVisible();
  });

  it('should destroy modal', () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    const showModalButton = getByText('Show Modal');
    fireEvent.click(showModalButton);

    const modal = getByTestId('modal');
    expect(modal).toBeVisible();

    const destroyButton = getByTestId('destroy-button');
    fireEvent.click(destroyButton);

    expect(queryByTestId('modal')).toBeNull();
  });
});
