import createTestServer from 'create-test-server';
import { extend } from 'umi-request';
import { renderHook } from '@testing-library/react-hooks';
import useRequest from '../index';

const request = extend({
  errorHandler(e) {
    throw e;
  },
});

describe('request library', () => {
  let server;

  beforeAll(async () => {
    server = await createTestServer();
  });

  afterAll(() => {
    server.close();
  });

  const prefix = api => `${server.url}${api}`;

  test('success with url', async () => {
    const rawData = {
      text: 'testtext',
    };
    server.get('/test/success', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForNextUpdate } = renderHook(() => useRequest(prefix('/test/success')));
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });

  test('success with function return url', async () => {
    const rawData = {
      text: 'testtext',
    };
    server.get('/test/success', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForNextUpdate } = renderHook(() => useRequest(() => prefix('/test/success')));
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });

  test('success with object', async () => {
    const rawData = {
      text: 'testtext',
    };
    server.get('/test/success', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForNextUpdate } = renderHook(() => useRequest({ url: prefix('/test/success'), method: 'GET' }));
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });

  test('success with function return object', async () => {
    const rawData = {
      text: 'testtext',
    };
    server.get('/test/success', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForNextUpdate } = renderHook(() => useRequest(() => ({ url: prefix('/test/success'), method: 'GET' })));
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });

  test('http failed with request', async () => {
    const rawData = {
      text: 'testtext',
    };
    server.get('/test/failed1', (req, res) => {
      res.status(500);
      res.send(rawData);
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest(() => request(prefix('/test/failed1')), {
        requestMethod: request,
      }),
    );
    await waitForNextUpdate(() => result.current.error);
    expect(result.current.error.message).toEqual('http error');
  });

  test('http failed with custom request', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest(() => {
        throw new Error('test error');
      }),
    );
    await waitForNextUpdate(() => result.current.error);
    expect(result.current.error.message).toEqual('test error');
  });

  test('http failed with url', async () => {
    const rawData = {
      text: 'testtext',
    };
    server.get('/test/failed3', (req, res) => {
      res.status(500);
      res.send(rawData);
    });

    const { result, waitForNextUpdate } = renderHook(() => useRequest(prefix('/test/failed3')));
    await waitForNextUpdate(() => result.current.error);
    expect(result.current.error.message).toEqual('Internal Server Error');
  });
});
