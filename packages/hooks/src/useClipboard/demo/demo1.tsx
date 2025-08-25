import React, { useState } from 'react';
import { Button, Card, Input, message, Space, Typography } from 'antd';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';
import useClipboard from '../index';

const { TextArea } = Input;
const { Text } = Typography;

interface UserInfo {
  id: number;
  name: string;
  email: string;
  age: number;
  address: {
    city: string;
    district: string;
  };
}

const Demo1: React.FC = () => {
  const [pastedData, setPastedData] = useState<any>(null);
  const { copy, paste, isSupported } = useClipboard();

  // 示例数据
  const userInfo: UserInfo = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 28,
    address: {
      city: 'Beijing',
      district: 'Haidian District',
    },
  };
  const configObject = {
    theme: 'dark',
    language: 'zh-CN',
    features: {
      clipboard: true,
      notifications: false,
      autoSave: true,
    },
    lastModified: new Date().toISOString(),
  };

  const handleCopyData = async (data: any, displayText: string) => {
    try {
      await copy(displayText, data);
      message.success(`${displayText} 复制成功！`);
    } catch (error:any) {
      message.error(`复制失败: ${error?.message}`);
    }
  };

  const handlePaste = async (showDisplayText?: boolean) => {
    try {
      const data = showDisplayText ? await paste() : await navigator.clipboard.readText();
      setPastedData(data);
      if (data) {
        message.success('粘贴成功！');
      } else {
        message.info('剪贴板为空');
      }
    } catch (error:any) {
      message.error(`粘贴失败: ${error?.message}`);
    }
  };

  if (!isSupported) {
    return (
      <div style={{ padding: '20px', color: '#ff4d4f' }}>
        Clipboard API is not supported in the current environment
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        {/* 用户信息 */}
        <Card
          size='small'
          title={
            <>
              <UserOutlined /> displayText:UserInfo
            </>
          }
        >
          <pre style={{ fontSize: '12px', margin: 0 }}>{JSON.stringify(userInfo, null, 2)}</pre>
          <Button
            size='small'
            style={{ marginTop: '8px' }}
            onClick={() => handleCopyData(userInfo, 'UserInfo')}
          >
            Copy
          </Button>
        </Card>

        {/* 配置对象 */}
        <Card
          size='small'
          title={
            <>
              <FileTextOutlined /> displayText:ConfigObject
            </>
          }
        >
          <pre style={{ fontSize: '12px', margin: 0 }}>{JSON.stringify(configObject, null, 2)}</pre>
          <Button
            size='small'
            style={{ marginTop: '8px' }}
            onClick={() => handleCopyData(configObject, 'ConfigObject')}
          >
            Copy
          </Button>
        </Card>

        <Button type='primary' onClick={() => handlePaste()}>
          CopyDisplayText
        </Button>
        <Button type='primary' onClick={() => handlePaste(true)}>
          CopyData
        </Button>
        {/* 显示粘贴的数据 */}
        {pastedData && (
          <Card title='Paste content' size='small'>
            <div style={{ marginBottom: '8px' }}>
              <Text strong>Data Type: </Text>
              <Text code>{typeof pastedData}</Text>
            </div>
            <TextArea
              value={
                typeof pastedData === 'string' ? pastedData : JSON.stringify(pastedData, null, 2)
              }
              rows={8}
              readOnly
            />
          </Card>
        )}
      </Space>
    </div>
  );
};

export default Demo1;
