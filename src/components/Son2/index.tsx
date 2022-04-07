import React, { useEffect } from 'react';

interface Son2Props {
  title: string;
  descripton: any;
}

export default React.memo((props: Son2Props) => {
  console.log('Son2 render!');

  const { title, descripton } = props;

  useEffect(() => {
    console.log('descripton change');
  }, [descripton]);

  return (
    <div>
      Son: {title} {descripton.name}
    </div>
  );
});
