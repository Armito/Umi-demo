import { createPortal } from 'react-dom';

interface MaskProps {
  visible: boolean;
}

const Mask = (props: MaskProps) => {
  const { visible } = props;

  if (!visible) return null;

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    ></div>,
    document.body,
  );
};

export default Mask;
