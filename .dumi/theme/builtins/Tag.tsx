import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
import React from 'react';

interface Props {
  lang: 'zh-CN' | 'en-US';
  tags: string;
}

const zh = {
  ssrTitle: '支持 SSR',
  ssrErrorTitle: '不支持 SSR',
  cpText: '跨端',
  cpTitle: '支持跨端场景，比如 RN、Taro、Remax 等',
  cpErrorTitle: '不支持跨端场景，比如 RN、Taro、Remax 等',
};

const en = {
  ssrTitle: 'Support SSR',
  ssrErrorTitle: 'No Support SSR',
  cpText: 'Cross Platform',
  cpTitle: 'Support cross platform，like RN、Taro、Remax etc',
  cpErrorTitle: 'Dose not support cross platform，like RN、Taro、Remax etc',
};

const SSRTag: React.FC<Props> = ({ lang = 'en-US', tags = '', ...props }) => {
  console.log('crosPlatform', props);
  const text = lang === 'en-US' ? en : zh;

  const tagArr = tags.split('&');
  const isSSR = tagArr.includes('ssr');
  const isCrossPlatform = tagArr.includes('crossPlatform');

  return (
    <span style={{ position: 'relative', height: 0, top: -28 }}>
      {isSSR && (
        <Tooltip title={text.ssrTitle}>
          <Tag icon={<CheckCircleOutlined />} color="success">
            SSR
          </Tag>
        </Tooltip>
      )}
      {!isSSR && (
        <Tooltip title={text.ssrErrorTitle}>
          <Tag icon={<CloseCircleOutlined />} color="error">
            SSR
          </Tag>
        </Tooltip>
      )}
      {isCrossPlatform && (
        <Tooltip title={text.cpTitle}>
          <Tag icon={<CheckCircleOutlined />} color="success">
            {text.cpText}
          </Tag>
        </Tooltip>
      )}
      {!isCrossPlatform && (
        <Tooltip title={text.cpErrorTitle}>
          <Tag icon={<CloseCircleOutlined />} color="error">
            {text.cpText}
          </Tag>
        </Tooltip>
      )}
    </span>
  );
};

export default SSRTag;
