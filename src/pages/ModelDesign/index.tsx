import { PageContainer } from '@ant-design/pro-layout';
import { SchemaForm, SchemaMarkupField as Field, Submit, FormEffectHooks } from '@formily/antd';
import { Input, FormCard, ArrayTable, Select, Checkbox } from '@formily/antd-components';
import { IFormEffect } from '@formily/react/lib';
import * as enums from './enums';
import { schemaExample } from './initialValues';
import 'antd/dist/antd.css';

const Index = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  const { onFieldValueChange$ } = FormEffectHooks;

  const modelDesignEffect: IFormEffect = (_, { setFieldValue }) => {
    onFieldValueChange$('fieldsCard.fields.*.type').subscribe((state) => {
      if (state.value === 'number') {
        setFieldValue(state.path.replace('type', 'listSorter'), true);
      }
    });
  };

  return (
    <PageContainer>
      <SchemaForm
        components={{ Input, ArrayTable, Select, Checkbox }}
        onSubmit={onSubmit}
        effects={modelDesignEffect}
        initialValues={schemaExample}
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
        <Submit />
      </SchemaForm>
    </PageContainer>
  );
};

export default Index;
