import { useEffect } from 'react';
import { SchemaForm, SchemaMarkupField as Field, createFormActions } from '@formily/antd';
import { Input, ArrayTable, Select, Checkbox } from '@formily/antd-components';
import { Modal as AntdModal } from 'antd';
import styles from './index.less';

const modalAction = createFormActions();

const Modal = ({
  modalVisible,
  hideModal,
  modalSubmitHandler,
  modalState,
}: {
  modalVisible: boolean;
  hideModal: (reload?: boolean) => void;
  modalSubmitHandler: (values: any) => void;
  modalState: { type: string; values: Record<string, unknown> };
}) => {
  useEffect(() => {
    modalAction.reset();
    if (modalState.values) {
      modalAction.setFormState((state) => {
        state.values = {
          data: modalState.values,
        };
      });
    }
    if (modalState.type === 'switch') {
      modalAction.setFieldState('data', (state) => {
        state.props['x-component-props'] = {
          operations: false,
          renderAddition: () => null,
        };
      });
      modalAction.setFormState((state) => {
        state.values = {
          data: [
            {
              title: 'Enabled',
              value: 1,
            },
            {
              title: 'Disabled',
              value: 0,
            },
          ],
        };
      });
    } else {
      modalAction.setFieldState('data', (state) => {
        state.props['x-component-props'] = {};
      });
    }
  }, [modalState]);

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
