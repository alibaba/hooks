import useExport from '../index';

describe('useExport', () => {
  it('test export', async () => {
    const { exportFile } = useExport();
    exportFile('https://codeload.github.com/alibaba/hooks/archive/refs/tags/v3.7.2.tar.gz', {});
  });
});
