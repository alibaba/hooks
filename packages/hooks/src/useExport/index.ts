/**
 * title: export file
 *
 * title.zh-CN: 导出文件
 */

import { useState } from 'react';

/**
 * 页面上按查询条件导出
 * @returns
 */
export default function useExport() {
  const [loading, setLoading] = useState(false);
  function exportFile(path?: string, params?: Record<string, any>) {
    setLoading(true);
    const queryString: string[] = [];
    Object.keys(params || {}).forEach((key) => {
      queryString.push(`${key}=${params?.[key] || ''}`);
    });
    window.location.href = `${path}?${queryString.join('&')}`;
    setLoading(false);
  }
  return {
    exportFile,
    loading,
  };
}
