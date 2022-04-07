import React from 'react';

interface Son2Props {
  title: string;
  descripton: any;
  onReset: () => void;
}

export default React.memo((props: Son2Props) => {
  console.log('Son4 render!');

  const { title, descripton, onReset } = props;

  return (
    <div onClick={onReset}>
      Son: {title} {descripton.name}
    </div>
  );
});
