/**
 * title: Basic usage
 * desc: Fires a callback on an element change
 */

import React, { useRef } from 'react';
import { useMutationObserver } from 'ahooks';

export default () => {
  const elementRef = useRef<HTMLDivElement>(null!);

  function onButtonClick() {
    const paraEl = document.createElement('p');
    elementRef.current.appendChild(paraEl);
  }

  function onElMutation(mutationList) {
    console.log(mutationList, 'mutation list');
    // todo: show the added node count
  }
  useMutationObserver(elementRef, onElMutation, { childList: true });

  return (
    <div>
      <button onClick={() => onButtonClick()}> Click me! </button>
      <div ref={elementRef} />
    </div>
  );
};
