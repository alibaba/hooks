import { renderHook } from '@testing-library/react-hooks';
import { enableFetchMocks } from 'jest-fetch-mock';
import useRequest from '../index';

enableFetchMocks();

describe('request library', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('success with url', async () => {
    fetch.mockResponseOnce(JSON.stringify({ text: 'testtext' }));

    const { result, waitForNextUpdate } = renderHook(() => useRequest('/test/success'));
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });

  test('success with function return url', async () => {
    fetch.mockResponseOnce(JSON.stringify({ text: 'testtext' }));

    const { result, waitForNextUpdate } = renderHook(() => useRequest(() => '/test/success'));
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });

  test('success with object', async () => {
    fetch.mockResponseOnce(JSON.stringify({ text: 'testtext' }));

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest({ url: '/test/success', method: 'GET' }),
    );
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });

  test('success with function return object', async () => {
    fetch.mockResponseOnce(JSON.stringify({ text: 'testtext' }));

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest(() => ({ url: '/test/success', method: 'GET' })),
    );
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });
});
