import moment from 'moment';
import { Input, Form, DatePicker, TreeSelect, Col, Select } from 'antd';

const SearchBuilder = (data: BasicListApi.Field[] | undefined) => {
  return (data || []).map((field) => {
    const basicAttr = {
      label: field.title,
      name: field.key,
      key: field.key,
    };
    switch (field.type) {
      case 'text':
        return (
          <Col sm={6} key={field.key}>
            <Form.Item {...basicAttr}>
              <Input disabled={field.disabled} />
            </Form.Item>
          </Col>
        );
      case 'datetime':
        return (
          <Col sm={12} key={field.key}>
            <Form.Item {...basicAttr}>
              <DatePicker.RangePicker
                showTime
                disabled={field.disabled}
                style={{ width: '100%' }}
                ranges={{
                  Today: [moment().startOf('day'), moment().endOf('day')],
                  'Last 7 Days': [moment().subtract(7, 'd'), moment()],
                  'Last 30 Days': [moment().subtract(30, 'days'), moment()],
                  'Last Month': [
                    moment().subtract(1, 'months').startOf('month'),
                    moment().subtract(1, 'months').endOf('month'),
                  ],
                }}
              />
            </Form.Item>
          </Col>
        );
      case 'tree':
        return (
          <Col sm={6} key={field.key}>
            <Form.Item {...basicAttr}>
              <TreeSelect treeData={field.data} disabled={field.disabled} treeCheckable />
            </Form.Item>
          </Col>
        );
      case 'select':
      case 'switch':
        return (
          <Col sm={6} key={field.key}>
            <Form.Item {...basicAttr} valuePropName="checked">
              <Select>
                {(field.data || []).map((option: any) => {
                  return (
                    <Select.Option value={option.value} key={option.value}>
                      {option.title}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        );

      default:
        return null;
    }
  });
};

export default SearchBuilder;
