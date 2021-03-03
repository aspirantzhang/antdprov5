import React, { useEffect } from 'react';
import { Form, Input, message, Tag, Spin, Row, Col, Tabs, Card, Space } from 'antd';
import { useRequest, useLocation, history } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import moment from 'moment';
import FormBuilder from '../builder/FormBuilder';
import ActionBuilder from '../builder/ActionBuilder';
import { setFieldsAdaptor, submitFieldsAdaptor } from '../helper';
import styles from '../index.less';

const Page = () => {
  const [form] = Form.useForm();
  const { TabPane } = Tabs;
  const location = useLocation();

  const init = useRequest<{ data: BasicListApi.PageData }>(
    `https://public-api-v2.aspirantzhang.com${location.pathname.replace(
      '/basic-list',
      '',
    )}?X-API-KEY=antd`,
    {
      onError: () => {
        history.goBack();
      },
    },
  );
  const request = useRequest(
    (values: any) => {
      message.loading({ content: 'Processing...', key: 'process', duration: 0 });
      const { uri, method, ...formValues } = values;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ...submitFieldsAdaptor(formValues),
          'X-API-KEY': 'antd',
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
        history.goBack();
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );

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
        history.goBack();
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
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (
    <PageContainer>
      {init?.loading ? (
        <Spin className={styles.formSpin} tip="Loading..." />
      ) : (
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
          <Row gutter={24}>
            <Col sm={16}>
              <Tabs type="card" className={styles.pageTabs}>
                {(init?.data?.layout?.tabs || []).map((tab) => {
                  return (
                    <TabPane tab={tab.title} key={tab.title}>
                      <Card>{FormBuilder(tab.data)}</Card>
                    </TabPane>
                  );
                })}
              </Tabs>
            </Col>
            <Col sm={8} className={styles.textAlignCenter}>
              {(init?.data?.layout?.actions || []).map((action) => {
                return (
                  <Card>
                    <Space>{ActionBuilder(action.data, actionHandler)}</Space>
                  </Card>
                );
              })}
            </Col>
          </Row>
          <FooterToolbar
            extra={
              <Tag>
                Update Time:
                {moment(form.getFieldValue('update_time')).format('YYYY-MM-DD HH:mm:ss')}
              </Tag>
            }
          >
            {ActionBuilder(init?.data?.layout?.actions[0].data, actionHandler)}
          </FooterToolbar>
          <Form.Item name="uri" key="uri" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="method" key="method" hidden>
            <Input />
          </Form.Item>
        </Form>
      )}
    </PageContainer>
  );
};

export default Page;
