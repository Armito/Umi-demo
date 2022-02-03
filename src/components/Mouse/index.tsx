import React, { EventHandler, useEffect, useState } from 'react';

interface MouseProps {
  slot?: (position: Position) => JSX.Element;
}

interface Position {
  x: number;
  y: number;
}

const Mouse = ({ slot }: MouseProps) => {
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const move = (e: any) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    document.body.addEventListener('mousemove', move);

    return () => {
      document.body.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div>{slot?.(position)}</div>
      Zi:
      <div>x: {position.x}</div>
      <div>y: {position.y}</div>
    </>
  );
};

export default Mouse;
