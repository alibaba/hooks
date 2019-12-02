import React from 'react';
import { Button } from 'antd';
import useFullscreen from '..';

export default () => {
  const { ref, isFullscreen, setFull, exitFull } = useFullscreen<HTMLDivElement>();
  return (
    <div ref={ref} style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
      <Button.Group>
        <Button onClick={setFull}>setFull</Button>
        <Button onClick={exitFull}>exitFull</Button>
      </Button.Group>
    </div>
  );
};
