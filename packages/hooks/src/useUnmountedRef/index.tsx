import React from "react";

const useUnmountedRef = () => {
  const unmountedRef = React.useRef(false);
  React.useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};

export default useUnmountedRef;
