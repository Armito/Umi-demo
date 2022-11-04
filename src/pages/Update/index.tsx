import React, { useEffect, useState, memo, useCallback, FC } from 'react';

interface SonProps {
  count: number;
  updateDetail?: (_detail: Record<string, unknown>) => void;
  area?: FC<SonProps>;
  // area?: JSX.Element;
}

const Son4 = memo((props: SonProps) => {
  console.log('son4 render');
  const { count, area } = props;
  return (
    <div>
      Son4 {count}
      {/* {area?.({ count })} */}
      {area}
    </div>
  );
});

const Father = () => {
  console.log('father render');

  useEffect(() => {
    console.log('father effect');
  });

  const [count, setCount] = useState<number>(1);
  console.log(count);
  // useEffect(() => {
  //   setCount(1);
  // }, []);
  useEffect(() => {
    setCount(101);
    // setCount((_count) => {
    //   // console.log(_count);
    //   return 200;
    // });
  }, []);

  const [detail, setDetail] = useState({});
  const updateDetail = (_detail: Record<string, unknown>) => {
    setDetail({
      ...detail,
      ..._detail,
    });
  };
  const handleClick = (e: React.MouseEvent) => {
    updateDetail({});
  };

  const Son1 = (props: SonProps) => {
    console.log('son1 render');
    const { count } = props;
    return <div>Son1 {count}</div>;
  };

  const Son2 = memo((props: SonProps) => {
    console.log('son2 render');
    const { count } = props;
    return <div>Son2 {count}</div>;
  });

  const Son3 = memo((props: SonProps) => {
    console.log('son3 render');
    const { count } = props;
    return <div>Son3 {count}</div>;
  });

  const Son5 = useCallback((props: SonProps) => {
    console.log('son5 render');
    const { count } = props;
    return <div>Son5 {count}</div>;
  }, []);

  const Son6 = useCallback((props: SonProps) => {
    console.log('son6 render');
    const { count } = props;
    return <div>Son6 {count}</div>;
  }, []);

  const Son7 = <div>Son7</div>;

  return (
    <>
      <div onClick={(e) => handleClick(e)}>Father: {count}</div>
      {/* <Son count={count} person={person}></Son> */}
      <Son1 count={count} />
      <Son2 count={count} />
      <Son3 count={count} updateDetail={updateDetail} />
      <Son4 count={count} area={Son7} />
      <Son5 count={count} />
    </>
  );
};

export default Father;
