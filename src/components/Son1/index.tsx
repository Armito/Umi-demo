import React from 'react';

interface Son1Props {
  count: number;
}

export default React.memo((props: Son1Props) => {
  console.log('Son1 render!');

  const { count } = props;

  return <div>Father: {count}</div>;
});
