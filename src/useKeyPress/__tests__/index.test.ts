import { renderHook, act } from '@testing-library/react-hooks';
import useKeyPress from '../index';

describe('useKeyPress', () => {
  it('should be defined', () => {
    expect(useKeyPress).toBeDefined();
  });
});
