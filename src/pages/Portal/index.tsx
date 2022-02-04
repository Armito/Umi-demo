import { useState } from 'react';
import Modal from '@/components/Modal';

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
      <Modal visible={visible} />
    </>
  );
};

export default Portal;
