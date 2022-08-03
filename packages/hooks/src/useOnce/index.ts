import { useState } from 'react';

function useOnce<S>(callback: () => S) {
  return useState(callback)[0];
}

export default useOnce;
