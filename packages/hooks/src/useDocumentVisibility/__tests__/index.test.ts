import useDocumentVisibility from '../index';
import { renderHook, act } from '@testing-library/react-hooks';

const mockIsBrowser = jest.fn();
const mockDocumentVisibilityState = jest.spyOn(document, 'visibilityState', 'get');

jest.mock('../../utils/isBrowser', () => {
  return {
    __esModule: true,
    get default() {
      return mockIsBrowser();
    },
  };
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('useDocumentVisibility', () => {
  it('should be defined', () => {
    expect(useDocumentVisibility).toBeDefined();
  });

  it('isBrowser effect corrent', async () => {
    mockDocumentVisibilityState.mockReturnValue('hidden');
    // Object.defineProperty(document, 'visibilityState', { value: 'hidden', writable: true });
    mockIsBrowser.mockReturnValue(false);
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current).toEqual('visible');
  });

  it('visibilitychange update correct ', async () => {
    mockDocumentVisibilityState.mockReturnValue('hidden');
    // Object.defineProperty(document, 'visibilityState', { value: 'hidden', writable: true });
    mockIsBrowser.mockReturnValue(true);
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current).toEqual('hidden');
    mockDocumentVisibilityState.mockReturnValue('visible');
    // Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: true });
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current).toEqual('visible');
  });
});
