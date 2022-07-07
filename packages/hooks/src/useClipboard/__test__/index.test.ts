import { renderHook, act } from '@testing-library/react-hooks';
import useClipboard from '../index';

describe('useClipboard', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const writeTextMock = jest.fn().mockResolvedValueOnce('111');

  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: writeTextMock,
    },
    configurable: true,
  });

  it('test on options optional', async () => {
    const { result } = renderHook(() => {
      const { onCopy, text, isSupport } = useClipboard();
      return {
        onCopy,
        text,
        isSupport,
      };
    });
    await act(async () => {
      result.current.onCopy('111');
    });
    expect(result.current.isSupport).toBe(true);
    expect(result.current.text).toBe('111');
  });

  it('test on options', async () => {
    const { result } = renderHook(() => {
      const { onCopy, text, isSupport } = useClipboard({
        source: '111',
      });
      return {
        onCopy,
        text,
        isSupport,
      };
    });

    await act(async () => {
      result.current.onCopy();
    });

    expect(result.current.isSupport).toBe(true);
    expect(result.current.text).toBe('111');
  });
});
