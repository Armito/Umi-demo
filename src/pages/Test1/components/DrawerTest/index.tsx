import { FC } from 'react';
import { Drawer, Form, Button, Input } from 'antd';
import { FormModel } from '../../types';

interface DrawerTestProps {
  visible: boolean;
  initialValues: FormModel;
  onClose: () => void;
  onSave: (values: FormModel) => void;
}

const DrawerTest: FC<DrawerTestProps> = (props) => {
  const { visible, initialValues, onSave, onClose } = props;

  const onFinish = (values: FormModel) => {
    onSave(values);
  };

  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <Form initialValues={initialValues} onFinish={onFinish} preserve={false}>
        <Form.Item name="title" required>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerTest;
