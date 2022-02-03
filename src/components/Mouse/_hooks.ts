import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useMouse = () => {
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

  return {
    position,
  };
};
