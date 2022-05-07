import { useState, useImperativeHandle, forwardRef } from 'react';

export interface iImperativeHandle {
  count: number;
  double?: () => void;
  divide?: () => void;
}

interface CountPorps {
  forwardRef: React.MutableRefObject<iImperativeHandle | undefined>;
}

const Count = forwardRef((props: CountPorps, ref) => {
  const { forwardRef } = props;

  const [count, setCount] = useState<number>(1);

  const double = () => {
    setCount(count * 2);
  };

  const divide = () => {
    setCount(count / 2);
  };

  useImperativeHandle(forwardRef, () => ({
    count,
    double,
  }));

  useImperativeHandle(ref, () => ({
    count,
    divide,
  }));

  return <div>{count}</div>;
});

export default Count;
