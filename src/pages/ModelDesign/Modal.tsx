import { SchemaForm, SchemaMarkupField as Field, createFormActions } from '@formily/antd';
import { Input, ArrayTable, Select, Checkbox } from '@formily/antd-components';
import { Modal as AntdModal } from 'antd';
import styles from './index.less';

const modalAction = createFormActions();

const Modal = ({
  modalVisible,
  hideModal,
  modalSubmitHandler,
}: {
  modalVisible: boolean;
  hideModal: (reload?: boolean) => void;
  modalSubmitHandler: (values: any) => void;
}) => {
  // const request = useRequest(
  //   (values: any) => {
  //     message.loading({ content: 'Processing...', key: 'process', duration: 0 });
  //     const { uri, method, ...formValues } = values;
  //     return {
  //       url: `${uri}`,
  //       method,
  //       data: {
  //         ...formValues,
  //       },
  //     };
  //   },
  //   {
  //     manual: true,
  //     onSuccess: (data) => {
  //       message.success({
  //         content: data.message,
  //         key: 'process',
  //       });
  //       hideModal(true);
  //     },
  //     formatResult: (res: any) => {
  //       return res;
  //     },
  //     throttleInterval: 1000,
  //   },
  // );

  return (
    <div>
      <AntdModal
        visible={modalVisible}
        onCancel={() => {
          hideModal();
        }}
        onOk={() => {
          modalAction.submit();
        }}
        maskClosable={false}
        forceRender
        focusTriggerAfterClose={false}
      >
        <SchemaForm
          components={{ Input, ArrayTable, Select, Checkbox }}
          className={styles.formilyForm}
          actions={modalAction}
          onSubmit={modalSubmitHandler}
        >
          <Field name="data" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Value" name="value" x-component="Input" />
            </Field>
          </Field>
        </SchemaForm>
      </AntdModal>
    </div>
  );
};

export default Modal;
