import React from 'react';
import { Input, Form } from 'antd';

const FormBuilder = (data: PageApi.Datum[] | undefined) => {
  return (data || []).map((field) => {
    return (
      <Form.Item label={field.title} name={field.key}>
        <Input />
      </Form.Item>
    );
  });
};

export default FormBuilder;
