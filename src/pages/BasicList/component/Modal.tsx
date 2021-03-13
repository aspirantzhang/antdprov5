import { useEffect } from 'react';
import { Modal as AntdModal, Form, Input, message, Tag, Spin } from 'antd';
import { useRequest } from 'umi';
import moment from 'moment';
import FormBuilder from '../builder/FormBuilder';
import ActionBuilder from '../builder/ActionBuilder';
import { setFieldsAdaptor, submitFieldsAdaptor } from '../helper';
import styles from '../index.less';

const Modal = ({
  modalVisible,
  hideModal,
  modalUri,
}: {
  modalVisible: boolean;
  hideModal: (reload?: boolean) => void;
  modalUri: string;
}) => {
  const [form] = Form.useForm();

  const init = useRequest<{ data: BasicListApi.PageData }>(`${modalUri}`, {
    manual: true,
    onError: () => {
      hideModal();
    },
  });
  const request = useRequest(
    (values: any) => {
      message.loading({ content: 'Processing...', key: 'process', duration: 0 });
      const { uri, method, ...formValues } = values;
      return {
        url: `${uri}`,
        method,
        data: {
          ...submitFieldsAdaptor(formValues),
        },
      };
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success({
          content: data.message,
          key: 'process',
        });
        hideModal(true);
      },
      formatResult: (res: any) => {
        return res;
      },
      throttleInterval: 1000,
    },
  );

  useEffect(() => {
    if (modalVisible) {
      form.resetFields();
      init.run();
    }
  }, [modalVisible]);

  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsAdaptor(init.data));
    }
  }, [init.data]);

  function actionHandler(action: BasicListApi.Action) {
    switch (action.action) {
      case 'submit':
        form.setFieldsValue({ uri: action.uri, method: action.method });
        form.submit();
        break;
      case 'cancel':
        hideModal();
        break;
      case 'reset':
        form.resetFields();
        break;

      default:
        break;
    }
  }

  const onFinish = (values: any) => {
    request.run(values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div>
      <AntdModal
        title={init?.data?.page?.title}
        visible={modalVisible}
        onCancel={() => {
          hideModal();
        }}
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data, actionHandler, request.loading)}
        maskClosable={false}
        forceRender
      >
        {init?.loading ? (
          <Spin className={styles.formSpin} tip="Loading..." />
        ) : (
          <>
            <Form
              form={form}
              {...layout}
              initialValues={{
                create_time: moment(),
                update_time: moment(),
                status: true,
              }}
              onFinish={onFinish}
            >
              {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
              <Form.Item name="uri" key="uri" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="method" key="method" hidden>
                <Input />
              </Form.Item>
            </Form>
            <Tag className={styles.formUpdateTime}>
              Update Time: {moment(form.getFieldValue('update_time')).format('YYYY-MM-DD HH:mm:ss')}
            </Tag>
          </>
        )}
      </AntdModal>
    </div>
  );
};

export default Modal;
