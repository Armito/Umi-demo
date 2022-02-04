import { createPortal } from 'react-dom';

interface ModalProps {
  visible: boolean;
}

const Modal = ({ visible }: ModalProps) => {
  if (!visible) {
    return <></>;
  }

  return createPortal(<div>123</div>, document.body);
};

export default Modal;
