import {
  FC,
  useEffect,
  useState,
  useImperativeHandle,
  MutableRefObject,
} from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { FormModel } from '../../types';
import { useUpdateEffect } from 'ahooks';

interface ModalTestProps {
  visible: boolean;
  content: string | number;
  initialValues: FormModel;
  onOk: (values: FormModel) => void;
  onCancel: () => void;
  //   handRef: MutableRefObject<{
  //     resetFields: () => void;
  //   }>;
}

const ModalTest: FC<ModalTestProps> = (props) => {
  const { visible, content, initialValues, onOk, onCancel } = props;

  //   const [form] = Form.useForm<FormModel>();

  console.log('run modal');

  const [word, setWord] = useState<string>('123');

  useEffect(() => {
    console.log('effect');
  }, []);

  const onSubmit = (values: FormModel) => {
    console.log(values);
    onOk(values);
  };

  const handleOnOk = () => {
    // onOk(form.getFieldsValue());
  };

  const handleOnCancel = () => {
    onCancel();
  };

  //   useImperativeHandle(handRef, () => ({
  //     resetFields: () => form.resetFields(),
  //   }));

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      //   onOk={handleOnOk}
      onCancel={handleOnCancel}
      destroyOnClose
      footer={null}
    >
      <p>{word}</p>
      <p>{content}</p>

      {/* {visible ? ( */}
      <Form initialValues={initialValues} onFinish={onSubmit} preserve={false}>
        <Form.Item name="title" required>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* ) : null} */}
    </Modal>
  );
};

export default ModalTest;
