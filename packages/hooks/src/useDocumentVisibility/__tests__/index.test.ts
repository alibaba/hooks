import { renderHook } from '@testing-library/react-hooks';
import useDocumentVisibility from '../index';

describe('useDocumentVisibility', () => {
  it('should be defined', () => {
    expect(useDocumentVisibility).toBeDefined();
  });
});
