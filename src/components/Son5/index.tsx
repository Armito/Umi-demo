import React from 'react';

interface Son2Props {
  onReset: () => void;
}

export default (props: Son2Props) => {
  console.log('Son5 render!');

  const { onReset } = props;

  return <div onClick={onReset}>Son</div>;
};
