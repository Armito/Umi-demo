import React, { useEffect, useState } from 'react';

interface SonProps {
  count: number;
}

const Son = ({ count }: SonProps) => {
  useEffect(() => {
    console.log('son render');
  }, [count]);

  return (
    <>
      <div>Son</div>
      <div>{count}</div>
    </>
  );
};

const Father = () => {
  useEffect(() => {
    console.log('father render');
  });

  const [count, setCount] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    console.log('e:', e);
  };

  return (
    <>
      <div onClick={(e) => handleClick(e)}>Father</div>
      <Son count={count}></Son>
    </>
  );
};

export default Father;
