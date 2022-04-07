import React from 'react';

interface Son2Props {
  title: string;
  descripton: any;
  detail: any;
}

export default React.memo((props: Son2Props) => {
  console.log('Son3 render!');

  const { title, descripton, detail } = props;

  return (
    <div>
      Son: {title} {descripton.name} {detail.age}
    </div>
  );
});
