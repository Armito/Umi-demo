import { useCallback, useState } from 'react';

export const useMeasure = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const measureRef = useCallback((node: Element | null) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
      setHeight(node.getBoundingClientRect().height);
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return {
    width,
    height,
    rect,
    measureRef,
  };
};
