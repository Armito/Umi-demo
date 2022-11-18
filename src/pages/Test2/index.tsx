import { useMeasure, useForceUpdate } from '@/utils/hooks';
import { useCallback } from 'react';

const Test2 = () => {
  console.log('render');

  const { measureRef, height, width } = useMeasure();
  const { forceUpdate } = useForceUpdate();

  const handleClick = useCallback(() => {
    forceUpdate();
  }, []);

  return (
    <>
      <h1 ref={measureRef} onClick={handleClick}>
        Hello, world
      </h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
      <h2>The above header is {Math.round(width)}px wide</h2>
    </>
  );
};

export default Test2;
