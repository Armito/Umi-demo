import { useRef } from 'react';
import { Button, Space } from 'antd';
import Count, { iImperativeHandle } from '@/components/Count';

const ImperativeHandle = () => {
  const CountRef_ = useRef<iImperativeHandle>();
  const CountRef = useRef<iImperativeHandle>();

  const double = () => {
    console.log(CountRef.current?.count);
    CountRef.current?.double?.();
  };

  const divide = () => {
    console.log(CountRef_.current?.count);
    CountRef_.current?.divide?.();
  };

  return (
    <>
      <Count ref={CountRef_} forwardRef={CountRef} />
      <Space>
        <Button onClick={double}>x2</Button>
        <Button onClick={divide}>/2</Button>
      </Space>
    </>
  );
};

export default ImperativeHandle;
