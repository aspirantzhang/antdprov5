import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd';
import { Input } from '@formily/antd-components';

const Index = () => {
  return (
    <SchemaForm components={{ Input }}>
      <Field title="Name" name="name" x-component="Input" />
    </SchemaForm>
  );
};

export default Index;
