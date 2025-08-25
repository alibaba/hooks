import React, { useState } from 'react';
import { Alert, Badge, Button, Card, Divider, Space, Typography } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import useClipboard from '../index';
import useAsyncEffect from '../../useAsyncEffect';

const { Text } = Typography;

interface ErrorInfo {
  code: string;
  message: string;
  timestamp: Date;
}

const Demo2: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<ErrorInfo[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const { copy, isSupported, hasPermission: checkPermission } = useClipboard();

  const addError = (code: string, message: string) => {
    const errorInfo: ErrorInfo = {
      code,
      message,
      timestamp: new Date(),
    };
    setErrors((prev) => [errorInfo, ...prev.slice(0, 4)]); // 只保留最近5个错误
  };
  const checkClipboardPermission = async () => {
    setIsChecking(true);
    try {
      const permission = await checkPermission();
      console.log('[demo3]>>checkClipboardPermission>>permission:', permission);
      setHasPermission(permission);
    } catch (error:any) {
      addError('PERMISSION_CHECK_FAILED', error?.message);
      setHasPermission(false);
    } finally {
      setIsChecking(false);
    }
  };
  useAsyncEffect(async () => {
    await checkClipboardPermission();
  }, []);

  const handleCopyWithError = async (scenario: string) => {
    try {
      switch (scenario) {
        case 'empty_text':
          await copy('', { data: 'test' });
          break;
        case 'large_data':
          const largeData = 'x'.repeat(2 * 1024 * 1024); // 2MB 数据
          await copy('Large Data', largeData);
          break;
        case 'null_data':
          await copy('Null Data', null);
          break;
        case 'normal':
          await copy('测试数据', { message: '这是一个正常的复制操作' });
          break;
      }
    } catch (error:any) {
      if (error?.code) {
        addError(error?.code, error?.message);
      } else {
        addError('UNKNOWN_ERROR', error?.message);
      }
    }
  };

  const getPermissionStatus = () => {
    if (hasPermission === null) {
      return { status: 'processing', text: 'checking...', icon: <ExclamationCircleOutlined /> };
    }
    if (hasPermission) {
      return { status: 'success', text: 'granted', icon: <CheckCircleOutlined /> };
    }
    return { status: 'error', text: 'denied', icon: <CloseCircleOutlined /> };
  };

  const getErrorTypeColor = (code: string) => {
    switch (code) {
      case 'PERMISSION_DENIED':
        return 'warning';
      case 'UNSUPPORTED':
        return 'error';
      case 'INVALID_INPUT':
        return 'default';
      case 'DATA_TOO_LARGE':
        return 'orange';
      default:
        return 'red';
    }
  };

  if (!isSupported) {
    return (
      <Alert
        message='Environment not supported'
        description='Clipboard API is not supported in current environment, please use it in HTTPS environment or localhost.'
        type='error'
        showIcon
      />
    );
  }

  const permissionStatus = getPermissionStatus();

  return (
    <div style={{ padding: '20px' }}>
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        {/* 权限状态 */}
        <Card size='small' title='Clipboard permission status'>
          <Space>
            <Badge
              status={permissionStatus.status as any}
              text={
                <Text>
                  {permissionStatus.icon} {permissionStatus.text}
                </Text>
              }
            />
            <Button size='small' loading={isChecking} onClick={checkClipboardPermission}>
              rechecking
            </Button>
          </Space>
        </Card>

        {/* 错误测试 */}
        <Card size='small' title='Error scenario testing'>
          <Space wrap>
            <Button size='small' onClick={() => handleCopyWithError('empty_text')}>
              Empty text error
            </Button>
            <Button size='small' onClick={() => handleCopyWithError('large_data')}>
              Too large data error
            </Button>
            <Button size='small' onClick={() => handleCopyWithError('null_data')}>
              Empty data error
            </Button>
          </Space>
        </Card>

        {/* 错误历史 */}
        {errors.length > 0 && (
          <Card
            size='small'
            title='Error history'
            extra={
              <Button size='small' onClick={() => setErrors([])}>
                Clear
              </Button>
            }
          >
            <Space direction='vertical' style={{ width: '100%' }}>
              {errors.map((error, index) => (
                <div key={index}>
                  <Space>
                    <Badge color={getErrorTypeColor(error.code)} />
                    <Text code>{error.code}</Text>
                    <Text type='secondary'>{error.timestamp.toLocaleTimeString()}</Text>
                  </Space>
                  <div style={{ marginTop: '4px', marginLeft: '20px' }}>
                    <Text type='danger'>{error.message}</Text>
                  </div>
                  {index < errors.length - 1 && <Divider style={{ margin: '8px 0' }} />}
                </div>
              ))}
            </Space>
          </Card>
        )}
      </Space>
    </div>
  );
};

export default Demo2;
