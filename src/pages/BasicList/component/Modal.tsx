import React, { useEffect } from 'react';
import { Modal as AntdModal, Form } from 'antd';
import { useRequest } from 'umi';
import moment from 'moment';
import FormBuilder from '../builder/FormBuilder';
import ActionBuilder from '../builder/ActionBuilder';

const Modal = ({
  modalVisible,
  hideModal,
  modalUri,
}: {
  modalVisible: boolean;
  hideModal: () => void;
  modalUri: string;
}) => {
  const [form] = Form.useForm();
  const init = useRequest<{ data: PageApi.Data }>(`${modalUri}`);

  useEffect(() => {
    if (modalVisible) {
      form.resetFields();
      init.run();
    }
  }, [modalVisible]);

  const setFieldsAdaptor = (data: PageApi.Data) => {
    if (data?.layout?.tabs && data?.dataSource) {
      const result = {};
      data.layout.tabs.forEach((tab) => {
        tab.data.forEach((field) => {
          switch (field.type) {
            case 'datetime':
              result[field.key] = moment(data.dataSource[field.key]);
              break;

            default:
              result[field.key] = data.dataSource[field.key];
              break;
          }
        });
      });
      return result;
    }
    return {};
  };

  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsAdaptor(init.data));
    }
  }, [init.data]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div>
      <AntdModal
        title={init?.data?.page?.title}
        visible={modalVisible}
        onCancel={hideModal}
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data)}
        maskClosable={false}
      >
        <Form
          form={form}
          {...layout}
          initialValues={{
            create_time: moment(),
            update_time: moment(),
            status: true,
          }}
        >
          {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
        </Form>
      </AntdModal>
    </div>
  );
};

export default Modal;
