import { useState } from 'react';
import { Button, Form, Cascader, Descriptions } from 'antd';
import Field from '@ant-design/pro-field';
import citiesOptions from '~/public/city.json';

interface Model {
  name: string;
  avatar?: string;
  city?: string[];
}

type FieldMode = 'read' | 'update' | 'edit';

const D = () => {
  const [mode, setMode] = useState<FieldMode>('edit');

  const [initialValues, setInitialValues] = useState<Model>({
    name: 'Armito',
  });

  const getCityLabel = (cityValue: string[] = []) => {
    if (cityValue.length) {
      const province = citiesOptions.find(
        (item: any) => item.value === cityValue?.[0],
      );
      if (province) {
        const area = province.children?.find(
          (item: any) => item.value === cityValue?.[1],
        );
        if (area) {
          const city = area.children.find(
            (item: any) => item.value === cityValue?.[2],
          );
          return [province.label, area.label, city?.label];
        }
      }
    } else {
      return [];
    }
  };

  const onfinish = (model: Model) => {
    console.log(model);
    setMode('read');
    setInitialValues(model);
  };

  const toEdit = () => {
    setMode('edit');
  };

  return (
    <Form initialValues={initialValues} onFinish={onfinish}>
      <Descriptions column={2}>
        <Descriptions.Item label="空字符串">
          <Form.Item name="name">
            <Field text={initialValues.name} mode={mode} />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="头像">
          <Form.Item name="avatar">
            <Field
              text="https://avatars2.githubusercontent.com/u/8186664?s=60&v=4"
              mode={mode}
              valueType="avatar"
            />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="省市">
          <Form.Item name="city">
            <Field
              text={getCityLabel(initialValues.city)}
              mode={mode}
              plain
              renderFormItem={() => {
                return (
                  <Cascader
                    placeholder={'请选择'}
                    options={citiesOptions}
                    style={{ width: '100%' }}
                  />
                );
              }}
            />
          </Form.Item>
        </Descriptions.Item>
      </Descriptions>

      <Button
        className={'customer-details-save'}
        type="primary"
        htmlType="submit"
      >
        保存
      </Button>

      <Button onClick={toEdit}>编辑</Button>
    </Form>
  );
};

export default D;
