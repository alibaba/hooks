import { useMemo } from "react"
 function getNestedValue(record: any, path: string): any {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), record);
}
export default function useRowSpan<T extends Record<string, any>>(
  data: T[],
  hierarchy: string[] = [],
  currentPageData?: T[]
) {
  const getRowSpan = useMemo(() => {
    if (!data || data.length === 0) {
      return () => ({ rowspan: 1 });
    }

    const workingData = currentPageData || data;

    const processedData = workingData.map((item, index) => ({
      ...item,
      key: item.key || `row-${index}`,
    }));

    const spanMap: Record<string, Record<string, { rowspan: number }>> = {};

    processedData.forEach(item => {
      spanMap[item.key] = {};
      hierarchy.forEach(field => {
        spanMap[item.key][field] = { rowspan: 1 };
      });
    });

    hierarchy.forEach((field, level) => {
      let spanCount = 1;
      let spanStartIndex = 0;

      for (let i = 0; i < processedData.length; i++) {
        const shouldMerge =
          i > 0 &&
          hierarchy
            .slice(0, level)
            .every(h => getNestedValue(processedData[i], h) === getNestedValue(processedData[i - 1], h)) &&
          getNestedValue(processedData[i], field) === getNestedValue(processedData[i - 1], field);

        console.log(`Checking merge for field ${field} at index ${i}:`, shouldMerge);

        if (shouldMerge) {
          spanCount++;
          spanMap[processedData[i].key][field] = { rowspan: 0 };
        }

        if (!shouldMerge || i === processedData.length - 1) {
          spanMap[processedData[spanStartIndex].key][field] = { rowspan: spanCount };
          spanCount = 1;
          spanStartIndex = i;
        }
      }
    });

    return (record: T, field: string) => {
      const recordKey = record.key || `row-${workingData.indexOf(record)}`;
      return spanMap[recordKey]?.[field] || { rowspan: 1 };
    };
  }, [data, currentPageData, hierarchy]);

  return getRowSpan;
}
