import { ModalProvider } from 'ahooks';
import React from 'react';
import Demo1 from './demo1';

export default () => {
  return (
    <ModalProvider>
      <Demo1 />
    </ModalProvider>
  );
};
