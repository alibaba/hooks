import createTestServer from 'create-test-server';
import request from 'umi-request';
import { renderHook } from '@testing-library/react-hooks';
import useRequest from '../index';

describe('normal request', () => {
  let server;

  beforeAll(async () => {
    server = await createTestServer();
  });

  afterAll(() => {
    server.close();
  });

  const prefix = api => `${server.url}${api}`;

  test('success with service', async () => {
    const rawData = {
      text: 'testtext',
    };
    server.get('/test/success', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest(() => request(prefix('/test/success'))),
    );
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });

  test('success with url', async () => {
    const rawData = {
      text: 'testtext',
    };
    server.get('/test/success2', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForNextUpdate } = renderHook(() => useRequest(prefix('/test/success')));
    await waitForNextUpdate(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });
});
