// main code of your hooks
import React, { useState } from 'react';

export default () => {
  const [ state, setState ] = useState('');
  return [ state, setState ];
};
