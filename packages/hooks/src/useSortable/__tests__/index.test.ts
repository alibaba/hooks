import { renderHook, act } from '@testing-library/react-hooks';
import useSortable from '../index';

const mockDragEvent:any = { 
  dataTransfer: {
    setDragImage: () => {},
  },
  target: {
    cloneNode: () => ({
      style: {},
    }),
    style: {},
  },
  persist: () => {},
};

beforeAll(() => {
  const spyFunc = jest.fn();
  Object.defineProperty((global as any).document.body, 'appendChild', { value: spyFunc });
  Object.defineProperty((global as any).document.body, 'removeChild', { value: spyFunc });
})

describe('useSortable', () => {

  it('should be defined', () => {
    expect(useSortable).toBeDefined();
  });

  it('test sort', async () => {
    let oldIndex, newIndex;
    const hook = renderHook(()=> useSortable({
      initialValue: ['1', '2','3'],
      onSort: (oi, ni) => {
        oldIndex = oi;
        newIndex = ni;
      },
    }))

    expect(hook.result.current[0].length).toBe(3);

    jest.useFakeTimers();
    hook.result.current[0][0].props.onDragStart(mockDragEvent)
    jest.runAllTimers();
    hook.result.current[0][1].props.onDragEnter();

    expect(hook.result.current[0].length).toBe(4);
    expect(hook.result.current[0][0].content).toBe('1');
    expect(hook.result.current[0][1].content).toBe('dummy');
    expect(hook.result.current[0][2].content).toBe('2');
    expect(hook.result.current[0][3].content).toBe('3');

    hook.result.current[0][2].props.onDragEnter();
    expect(hook.result.current[0][0].content).toBe('1');
    expect(hook.result.current[0][1].content).toBe('2');
    expect(hook.result.current[0][2].content).toBe('dummy');
    expect(hook.result.current[0][3].content).toBe('3');

    hook.result.current[0][3].props.onDragEnter();
    expect(hook.result.current[0][0].content).toBe('1');
    expect(hook.result.current[0][1].content).toBe('2');
    expect(hook.result.current[0][2].content).toBe('3');
    expect(hook.result.current[0][3].content).toBe('dummy');

    hook.result.current[0][0].props.onDragEnd();

    expect(hook.result.current[0][0].content).toBe('2');
    expect(hook.result.current[0][1].content).toBe('3');
    expect(hook.result.current[0][2].content).toBe('1');

  });
});
