import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Divider, List, Space, Switch, Tag, Typography } from 'antd';
import { ClockCircleOutlined, CopyOutlined, PauseCircleOutlined } from '@ant-design/icons';
import useClipboard from '../index';

const { Text } = Typography;

interface ClipboardHistory {
  id: number;
  content: any;
  displayText: string;
  timestamp: Date;
  type: 'text' | 'object' | 'array';
  size: number;
}

const Demo3: React.FC = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [history, setHistory] = useState<ClipboardHistory[]>([]);
  const [currentContent, setCurrentContent] = useState<string>('');
  const intervalRef = useRef<any>(null);
  const lastContentRef = useRef<string>('');
  const { paste, copy, isSupported } = useClipboard();

  const startMonitoring = () => {
    intervalRef.current = setInterval(async () => {
      try {
        const content = await paste();
        if (content !== null) {
          const contentStr = typeof content === 'string' ? content : JSON.stringify(content);

          // 只有内容发生变化时才记录
          if (contentStr !== lastContentRef.current) {
            lastContentRef.current = contentStr;
            setCurrentContent(contentStr);

            const historyItem: ClipboardHistory = {
              id: Date.now(),
              content,
              displayText: typeof content === 'string' ? content : '结构化数据',
              timestamp: new Date(),
              type: Array.isArray(content)
                ? 'array'
                : typeof content === 'object'
                  ? 'object'
                  : 'text',
              size: contentStr.length,
            };

            setHistory((prev) => [historyItem, ...prev.slice(0, 9)]); // 保留最近10条记录
          }
        }
      } catch (error) {
        console.error('监听剪贴板失败:', error);
      }
    }, 1000); // 每秒检查一次
  };

  const stopMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };
  useEffect(() => {
    if (isMonitoring) {
      startMonitoring();
    } else {
      stopMonitoring();
    }

    return () => stopMonitoring();
  }, [isMonitoring]);
  const handleToggleMonitoring = (checked: boolean) => {
    setIsMonitoring(checked);
  };

  const handleCopyFromHistory = async (item: ClipboardHistory) => {
    try {
      await copy(item.displayText, item.content);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    setCurrentContent('');
    lastContentRef.current = '';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'blue';
      case 'object':
        return 'green';
      case 'array':
        return 'orange';
      default:
        return 'default';
    }
  };

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (!isSupported) {
    return <div style={{ padding: '20px', color: '#ff4d4f' }}>当前环境不支持 Clipboard API</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        {/* 控制面板 */}
        <Card size='small' title='Audio monitoring'>
          <Space>
            <Switch
              checked={isMonitoring}
              onChange={handleToggleMonitoring}
              checkedChildren={<ClockCircleOutlined />}
              unCheckedChildren={<PauseCircleOutlined />}
            />
            <Text>{isMonitoring ? 'Listening in...' : 'suspend'}</Text>
            <Divider type='vertical' />
            <Button size='small' onClick={handleClearHistory}>
              Clear
            </Button>
            <Text type='secondary'>History: {history.length}/10</Text>
          </Space>
        </Card>

        {/* 当前内容 */}
        {currentContent && (
          <Card size='small' title='Current clipboard contents'>
            <Text code style={{ wordBreak: 'break-all' }}>
              {truncateText(currentContent, 200)}
            </Text>
          </Card>
        )}

        {/* 历史记录 */}
        <Card
          size='small'
          title='Clipboard history'
          extra={<Text type='secondary'>{isMonitoring ? 'Listening in...' : 'suspend'}</Text>}
        >
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
              {isMonitoring ? 'Wait for the clipboard to change...' : 'No historical record'}
            </div>
          ) : (
            <List
              dataSource={history}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Button
                      key={index}
                      size='small'
                      icon={<CopyOutlined />}
                      onClick={() => handleCopyFromHistory(item)}
                    >
                      Copy
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Tag color={getTypeColor(item.type)}>{item.type}</Tag>
                        <Text type='secondary' style={{ fontSize: '12px' }}>
                          {item.timestamp.toLocaleTimeString()}
                        </Text>
                        <Text type='secondary' style={{ fontSize: '12px' }}>
                          {formatSize(item.size)}
                        </Text>
                      </Space>
                    }
                    description={
                      <Text style={{ wordBreak: 'break-all', fontSize: '12px' }}>
                        {truncateText(
                          typeof item.content === 'string'
                            ? item.content
                            : JSON.stringify(item.content),
                          150,
                        )}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>

        {/* 测试数据 */}
        <Card size='small' title='Generating test data'>
          <Space wrap>
            <Button size='small' onClick={() => copy('ahooks', 'ahooks are unmatched')}>
              Copy Text
            </Button>
            <Button
              size='small'
              onClick={() =>
                copy('UserInfo', {
                  id: Math.floor(Math.random() * 1000),
                  name: 'TestUser',
                  timestamp: new Date().toISOString(),
                })
              }
            >
              Copy Object
            </Button>
            <Button
              size='small'
              onClick={() =>
                copy('Array', [
                  Math.floor(Math.random() * 100),
                  Math.floor(Math.random() * 100),
                  Math.floor(Math.random() * 100),
                ])
              }
            >
              Copy Array
            </Button>
          </Space>
        </Card>

        {/* 说明信息 */}
      </Space>
    </div>
  );
};

export default Demo3;
