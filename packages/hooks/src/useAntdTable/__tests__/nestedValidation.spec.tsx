import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useAntdTable from '../index';

describe('useAntdTable nested field validation', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: false,
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test.each([
    { name: ['user', 'name'], values: { user: { name: 'Alice' } } },
    { name: ['users', 0, 'name'], values: { users: [{ name: 'Alice' }] } },
  ])('validates the registered field $name before requesting', async ({ name, values }) => {
    const service = vi.fn().mockResolvedValue({ total: 0, list: [] });
    const App = () => {
      const [form] = Form.useForm();
      const { search } = useAntdTable(service, { form, manual: true });
      return (
        <Form form={form}>
          <Form.Item
            name={name}
            initialValue=""
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <input aria-label="Name" />
          </Form.Item>
          <button type="button" onClick={search.submit}>
            Search
          </button>
        </Form>
      );
    };
    const view = render(<App />);
    fireEvent.click(view.getByText('Search'));
    await waitFor(() => expect(view.queryByText('Name is required')).not.toBeNull());
    expect(service).not.toHaveBeenCalled();

    fireEvent.change(view.getByLabelText('Name'), { target: { value: 'Alice' } });
    fireEvent.click(view.getByText('Search'));
    await waitFor(() => expect(service).toHaveBeenCalledTimes(1));
    expect(service.mock.calls[0][1]).toEqual(values);
    view.unmount();
  });
});
