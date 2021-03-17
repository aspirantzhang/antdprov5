import { useState, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormEffectHooks,
  createFormActions,
} from '@formily/antd';
import { Button } from 'antd';
import { Input, FormCard, ArrayTable, Select, Checkbox } from '@formily/antd-components';
import { useSetState } from 'ahooks';
import type { IFormEffect, IFieldState } from '@formily/react/lib';
import Modal from './Modal';
import * as enums from './enums';
import { schemaExample } from './initialValues';
import 'antd/dist/antd.css';
import styles from './index.less';

const modelDesignAction = createFormActions();

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentFieldPath, setCurrentFieldPath] = useState('');
  const [modalState, setModalState] = useSetState({
    type: '',
    values: {},
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const { onFieldValueChange$, onFieldChange$ } = FormEffectHooks;

  useEffect(() => {
    if (modalState.type) {
      setModalVisible(true);
    }
  }, [modalState.type]);

  const modelDesignEffect: IFormEffect = (_, { setFieldState, getFieldValue }) => {
    onFieldChange$('fieldsCard.fields.*.data').subscribe(({ path, active, value }) => {
      if (active === true) {
        setCurrentFieldPath(path as string);
        setModalState({
          values: value,
          type: getFieldValue(path?.replace('data', 'type')),
        });
      }
    });
    onFieldValueChange$('fieldsCard.fields.*.type').subscribe(({ value, path }) => {
      if (value === 'switch' || value === 'radio') {
        setFieldState(path.replace('type', 'data'), (state: IFieldState) => {
          state.editable = true;
          state.required = true;
        });
      } else {
        setFieldState(path.replace('type', 'data'), (state: IFieldState) => {
          state.editable = false;
          state.required = false;
        });
      }
    });
    onFieldValueChange$('basicCard.routeName').subscribe(({ value }) => {
      setFieldState('*.*.*.uri', (state: IFieldState) => {
        state.value = state.value?.replace('admins', value);
      });
    });
  };

  const modalSubmitHandler = (values: any) => {
    setModalVisible(false);
    modelDesignAction.setFieldValue(currentFieldPath, values.data);
    setModalState({ type: '', values: {} });
  };

  return (
    <PageContainer>
      <SchemaForm
        components={{ Input, ArrayTable, Select, Checkbox, Button }}
        onSubmit={onSubmit}
        initialValues={schemaExample}
        effects={modelDesignEffect}
        actions={modelDesignAction}
        className={styles.formilyForm}
      >
        <FormCard title="Basic" name="basicCard">
          <Field title="Route Name" name="routeName" x-component="Input" />
        </FormCard>

        <FormCard title="Fields" name="fieldsCard">
          <Field name="fields" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Name" name="name" x-component="Input" />
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.fieldType} />
              <Field
                title="Data"
                name="data"
                x-component="Button"
                x-component-props={{
                  children: 'Data',
                }}
              />
              <Field title="List Sorter" name="listSorter" x-component="Checkbox" />
              <Field title="Hide InColumn" name="hideInColumn" x-component="Checkbox" />
              <Field title="Edit Disabled" name="editDisabled" x-component="Checkbox" />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="List Action">
          <Field name="listAction" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Add Action">
          <Field name="addAction" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Edit Action">
          <Field name="editAction" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Table Toolbar">
          <Field name="tableToolbar" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Batch Toolbar">
          <Field name="batchToolbar" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Batch Toolbar - Trashed">
          <Field name="batchToolbarTrashed" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>
      </SchemaForm>
      <FooterToolbar
        extra={
          <Button
            type="primary"
            onClick={() => {
              modelDesignAction.submit();
            }}
          >
            Submit
          </Button>
        }
      />
      <Modal
        modalVisible={modalVisible}
        hideModal={() => {
          setModalVisible(false);
          setModalState({ type: '', values: {} });
        }}
        modalSubmitHandler={modalSubmitHandler}
        modalState={modalState}
      />
    </PageContainer>
  );
};

export default Index;
