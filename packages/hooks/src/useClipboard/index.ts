import {useCallback, useMemo} from 'react';

type FlexibleClipboardData<T = any> = T;

// 定义返回的 useClipboard 钩子的类型
interface UseClipboard {
  copy: <T = any>(displayText: string, data: FlexibleClipboardData<T>) => Promise<void>;
  paste: <T = any>() => Promise<FlexibleClipboardData<T> | string | null>;
  isSupported: boolean;
  hasPermission: () => Promise<boolean>;
}

// 自定义错误类型
class ClipboardError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'ClipboardError';
    this.code = code;
  }
}
// 常量定义
const CLIPBOARD_DATA_MARKER = '__clipboardData';
const CLIPBOARD_VERSION = '1.0';
function useClipboard(): UseClipboard {
  // 检查剪贴板API是否可用 - 使用 useMemo 避免重复计算
  const isSupported = useMemo(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    return (
      'clipboard' in navigator &&
      'write' in navigator.clipboard &&
      'read' in navigator.clipboard &&
      window.isSecureContext // HTTPS 或 localhost 环境
    );
  }, []);

  // 检查剪贴板权限
  const hasPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      // 检查读写权限
      const writePermission = await navigator.permissions.query({
        name: 'clipboard-write' as PermissionName,
      });
      const readPermission = await navigator.permissions.query({
        name: 'clipboard-read' as PermissionName,
      });
      return writePermission.state !== 'denied' && readPermission.state !== 'denied';
    } catch {
      // 如果权限API不可用，尝试实际操作来测试
      try {
        await navigator.clipboard.readText();
        return true;
      } catch {
        return false;
      }
    }
  }, [isSupported]);

  const validateInput = useCallback(
    <T = any>(displayText: string, data: FlexibleClipboardData<T>): void => {
      if (!displayText.trim()) {
        throw new ClipboardError('Display text must be a non-empty string', 'INVALID_INPUT');
      }

      if (data === null || data === undefined) {
        throw new ClipboardError('Data cannot be null or undefined', 'INVALID_INPUT');
      }
      // 检查数据大小（Chrome 限制约 2MB）
      const dataSize = JSON.stringify(data).length;
      if (dataSize > 1024 * 1024) {
        // 1MB 限制
        throw new ClipboardError('Data size exceeds limit (1MB)', 'DATA_TOO_LARGE');
      }
    },
    [],
  );

  // 创建包装数据
  const createWrappedData = useCallback(
    <T = any>(data: FlexibleClipboardData<T>) => ({
      [CLIPBOARD_DATA_MARKER]: true,
      version: CLIPBOARD_VERSION,
      timestamp: Date.now(),
      data: data, // 将实际数据包装在 data 字段中
    }),
    [],
  );

  // 验证和解包数据
  const unwrapData = useCallback(<T = any>(rawData: any): FlexibleClipboardData<T> | null => {
    if (!rawData || typeof rawData !== 'object') {
      return null;
    }

    if (!rawData[CLIPBOARD_DATA_MARKER]) {
      return null;
    }

    // 版本兼容性检查
    if (rawData.version && rawData.version !== CLIPBOARD_VERSION) {
      console.warn(`Clipboard data version mismatch: ${rawData.version} vs ${CLIPBOARD_VERSION}`);
    }
    // 返回包装的实际数据
    return rawData.data as FlexibleClipboardData<T>;
  }, []);

  // 复制到剪贴板
  const copy = useCallback(
    async <T = any>(displayText: string, data: FlexibleClipboardData<T>): Promise<void> => {
      if (!isSupported) {
        throw new ClipboardError(
          'Clipboard API is not supported in this environment',
          'UNSUPPORTED',
        );
      }

      validateInput(displayText, data);

      try {
        const wrappedData = createWrappedData(data);
        const jsonString = JSON.stringify(wrappedData);

        // 创建剪贴板项
        const clipboardItems: Record<string, Blob> = {
          'text/plain': new Blob([displayText], { type: 'text/plain' }),
        };

        // 只有在支持的情况下才添加 HTML 格式
        if (ClipboardItem.supports && ClipboardItem.supports('text/html')) {
          clipboardItems['text/html'] = new Blob([jsonString], { type: 'text/html' });
        } else {
          // 降级方案：将数据编码到纯文本中
          const encodedData = `${displayText}\n__CLIPBOARD_DATA__:${btoa(jsonString)}`;
          clipboardItems['text/plain'] = new Blob([encodedData], { type: 'text/plain' });
        }

        const clipboardItem = new ClipboardItem(clipboardItems);
        await navigator.clipboard.write([clipboardItem]);
      } catch (error) {
        if (error instanceof ClipboardError) {
          throw error;
        }

        // 详细的错误处理
        let errorCode = 'COPY_FAILED';
        let errorMessage = 'Failed to copy to clipboard';
        if (error instanceof Error) {
          if (error.name === 'NotAllowedError') {
            errorCode = 'PERMISSION_DENIED';
            errorMessage = 'Clipboard access denied. Please grant permission.';
          } else if (error.name === 'DataError') {
            errorCode = 'INVALID_FORMAT';
            errorMessage = 'Invalid data format for clipboard';
          } else if (error.name === 'SecurityError') {
            errorCode = 'SECURITY_ERROR';
            errorMessage = 'Clipboard access blocked by security policy';
          } else {
            errorMessage = `${errorMessage}: ${error.message}`;
          }
        }

        throw new ClipboardError(errorMessage, errorCode);
      }
    },
    [isSupported, validateInput, createWrappedData],
  );

  // 从剪贴板粘贴
  const paste = useCallback(async <T = any>(): Promise<
    FlexibleClipboardData<T> | string | null
  > => {
    if (!isSupported) {
      throw new ClipboardError('Clipboard API is not supported in this environment', 'UNSUPPORTED');
    }

    try {
      const clipboardItems = await navigator.clipboard.read();

      if (!clipboardItems?.length) {
        return null;
      }

      for (const item of clipboardItems) {
        // 优先尝试读取 HTML 格式的结构化数据
        if (item.types.includes('text/html')) {
          try {
            const htmlBlob = await item.getType('text/html');
            const jsonText = await htmlBlob.text();

            if (jsonText) {
              const parsedData = JSON.parse(jsonText);
              const unwrapped = unwrapData<T>(parsedData);
              if (unwrapped !== null) {
                return unwrapped;
              }
            }
          } catch (parseError) {
            console.debug('Failed to parse HTML clipboard data:', parseError);
          }
        }

        // 尝试读取纯文本（可能包含编码的数据）
        if (item.types.includes('text/plain')) {
          const plainBlob = await item.getType('text/plain');
          const plainText = await plainBlob.text();

          if (!plainText) {
            continue;
          }

          // 检查是否是编码的数据（降级方案）
          const dataMarker = '\n__CLIPBOARD_DATA__:';
          const markerIndex = plainText.indexOf(dataMarker);

          if (markerIndex !== -1) {
            try {
              const encodedData = plainText.substring(markerIndex + dataMarker.length);
              const decodedData = JSON.parse(atob(encodedData));
              const unwrapped = unwrapData<T>(decodedData);

              if (unwrapped !== null) {
                return unwrapped;
              }
            } catch (decodeError) {
              console.debug('Failed to decode embedded clipboard data:', decodeError);
            }
          }

          // 返回纯文本
          return plainText;
        }
      }

      return null;
    } catch (error) {
      if (error instanceof ClipboardError) {
        throw error;
      }

const errorMap = {
 ['NotAllowedError']: {
    code: 'PERMISSION_DENIED',
    message: 'Clipboard read access denied. Please grant permission.'
  },
  ['SECURITY_ERROR']: {
    code: 'SECURITY_ERROR',
    message: 'Clipboard access blocked by security policy'
  }
};

let errorCode = 'COPY_FAILED';
let errorMessage = 'Failed to copy to clipboard';

if (error instanceof Error) {
  const mapped = errorMap[error.name];
  if (mapped) {
    errorCode = mapped.code;
    errorMessage = mapped.message;
  } else {
    errorMessage = `${errorMessage}: ${error.message}`;
  }
}

      throw new ClipboardError(errorMessage, errorCode);
    }
  }, [isSupported, unwrapData]);

  return {
    copy,
    paste,
    isSupported,
    hasPermission,
  };
}

export default useClipboard;
