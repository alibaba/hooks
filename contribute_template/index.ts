// main code of your hooks
import { useState } from 'react';

export default () => {
  const [ state, setState ] = useState('');
  return [ state, setState ];
};
