import { useRef, useState, MutableRefObject } from 'react';
import { IRouteComponentProps } from 'umi';
import { Space, Button } from 'antd';
import ModalTest from './components/ModalTest';
import DrawerTest from './components/DrawerTest';
import { useCount } from '@/hooks/useCount';
import { FormModel } from './types';

const Test1 = (props: IRouteComponentProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { count, increment } = useCount();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onModalOk = (values: FormModel) => {
    setIsModalVisible(false);
    setInitialValues({
      ...initialValues,
      ...values,
    });
  };

  const onModalCancel = () => {
    setIsModalVisible(false);
    setInitialValues({
      ...initialValues,
      title: 'Conde',
    });
  };

  const [initialValues, setInitialValues] = useState({
    title: 'Conde',
  });

  const changeInit = () => {
    setInitialValues({
      ...initialValues,
      title: initialValues.title + 'i',
    });
  };

  const handRef = useRef() as MutableRefObject<{
    resetFields: () => void;
  }>;

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const onDrawerSave = (values: FormModel) => {
    setInitialValues({
      ...initialValues,
      ...values,
    });
    onDrawerClose();
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>

        <Button type="primary" onClick={showDrawer}>
          Open Drawer
        </Button>

        <Button type="primary" onClick={increment}>
          +++++1
        </Button>

        <Button type="primary" onClick={changeInit}>
          changeInit
        </Button>
      </Space>

      {/* {isModalVisible ? ( */}
      <ModalTest
        visible={isModalVisible}
        content={count}
        onOk={onModalOk}
        onCancel={onModalCancel}
        initialValues={initialValues}
        // handRef={handRef}
      />
      {/* ) : null} */}

      <DrawerTest
        visible={isDrawerVisible}
        initialValues={initialValues}
        onSave={onDrawerSave}
        onClose={onDrawerClose}
      />
    </>
  );
};

export default Test1;
