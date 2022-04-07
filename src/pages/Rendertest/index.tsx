import React, { useState, useMemo, useCallback } from 'react';
import { Button } from 'antd';
import Son1 from '@/components/Son1';
import Son2 from '@/components/Son2';
import Son3 from '@/components/Son3';
import Son4 from '@/components/Son4';
import Son5 from '@/components/Son5';
import { useCount } from '@/hooks/useCount';

const RenderTest = () => {
  console.log('Father render!');

  const { count, increment, decrement } = useCount();

  // const [title, setTitle] = useState<string>('Armito')
  const title = '233';

  const [descripton, setDescripton] = useState({ name: 'Armito' });

  const detail = useMemo(() => ({ age: 18 }), []);

  const onReset = useCallback(() => {
    console.log('reset!');
    // setDescripton({ name: 'Pikachu' })
    // setTitle('JoJo')
    increment();
  }, [increment]);

  return (
    <>
      <Button onClick={increment}>+++</Button>
      <Button onClick={decrement}>---</Button>
      <div>{count}</div>
      <Son1 count={count} />
      <Son2 title={title} descripton={descripton} />
      <Son3 title={title} descripton={descripton} detail={detail} />
      <Son4 title={title} descripton={descripton} onReset={onReset} />
      <Son5 onReset={onReset} />
    </>
  );
};

export default RenderTest;
