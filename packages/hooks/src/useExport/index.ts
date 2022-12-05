/**
 * title: export file
 *
 * title.zh-CN: 导出文件
 */

/**
 * 页面上按查询条件导出
 * @returns
 */
export default function useExport() {
  function exportFile(path?: string, params?: Record<string, any>) {
    const queryString: string[] = [];
    Object.keys(params || {}).forEach((key) => {
      queryString.push(`${key}=${params?.[key] || ''}`);
    });
    window.location.href = `${path}?${queryString.join('&')}`;
  }
  return {
    exportFile,
  };
}
