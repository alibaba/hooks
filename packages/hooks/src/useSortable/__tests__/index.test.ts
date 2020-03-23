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

    expect(hook.result.current.list.length).toBe(3);

    jest.useFakeTimers();
    hook.result.current.getSortProps(0).onDragStart(mockDragEvent)
    jest.runAllTimers();
    hook.result.current.getSortProps(1).onDragEnter();

    expect(hook.result.current.list.length).toBe(4);
    expect(hook.result.current.list[0].content).toBe('1');
    expect(hook.result.current.list[1].content).toBe('dummy');
    expect(hook.result.current.list[2].content).toBe('2');
    expect(hook.result.current.list[3].content).toBe('3');

    hook.result.current.getSortProps(2).onDragEnter();
    expect(hook.result.current.list[0].content).toBe('1');
    expect(hook.result.current.list[1].content).toBe('2');
    expect(hook.result.current.list[2].content).toBe('dummy');
    expect(hook.result.current.list[3].content).toBe('3');

    hook.result.current.getSortProps(3).onDragEnter();
    expect(hook.result.current.list[0].content).toBe('1');
    expect(hook.result.current.list[1].content).toBe('2');
    expect(hook.result.current.list[2].content).toBe('3');
    expect(hook.result.current.list[3].content).toBe('dummy');

    hook.result.current.getSortProps(0).onDragEnd();

    expect(hook.result.current.list[0].content).toBe('2');
    expect(hook.result.current.list[1].content).toBe('3');
    expect(hook.result.current.list[2].content).toBe('1');

  });
});
