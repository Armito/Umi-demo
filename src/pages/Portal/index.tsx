import { useState } from 'react';
import Mask from '@/components/Mask';

const Portal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  return (
    <>
      <div onClick={open}>open</div>
      <div onClick={close}>close</div>
      <Mask visible={visible} />
    </>
  );
};

export default Portal;
