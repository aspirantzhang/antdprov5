import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Card, Pagination, Space, Modal as AntdModal, message } from 'antd';
import { useRequest, useIntl } from 'umi';
import { useSessionStorageState } from 'ahooks';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ColumnBuilder from './builder/ColumnBuilder';
import ActionBuilder from './builder/ActionBuilder';
import Modal from './component/Modal';
import styles from './index.less';

const Index = () => {
  const [pageQuery, setPageQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUri, setModalUri] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableColumns, setTableColumns] = useSessionStorageState<BasicListApi.Field[]>(
    'basicListTableColumns',
    [],
  );
  const { confirm } = AntdModal;
  const lang = useIntl();

  const init = useRequest<{ data: BasicListApi.ListData }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd${pageQuery}${sortQuery}`,
  );
  const request = useRequest(
    (values: any) => {
      message.loading({ content: 'Processing...', key: 'process', duration: 0 });
      const { uri, method, ...formValues } = values;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ...formValues,
          'X-API-KEY': 'antd',
        },
      };
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success({
          content: data?.message,
          key: 'process',
        });
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );

  useEffect(() => {
    init.run();
  }, [pageQuery, sortQuery]);

  useEffect(() => {
    if (init?.data?.layout?.tableColumn) {
      setTableColumns(ColumnBuilder(init?.data?.layout?.tableColumn, actionHandler));
    }
  }, [init?.data?.layout?.tableColumn]);

  useEffect(() => {
    if (modalUri) {
      setModalVisible(true);
    }
  }, [modalUri]);

  function actionHandler(action: BasicListApi.Action, record: BasicListApi.Field) {
    switch (action.action) {
      case 'modal':
        setModalUri(
          (action.uri || '').replace(/:\w+/g, (field) => {
            return record[field.replace(':', '')];
          }),
        );
        break;
      case 'reload':
        init.run();
        break;
      case 'delete':
      case 'deletePermanently':
      case 'restore':
        {
          const operationName = lang.formatMessage({
            id: `basic-list.list.actionHandler.operation.${action.action}`,
          });
          confirm({
            title: lang.formatMessage(
              {
                id: 'basic-list.list.actionHandler.confirmTitle',
              },
              {
                operationName,
              },
            ),
            icon: <ExclamationCircleOutlined />,
            content: batchOverview(Object.keys(record).length ? [record] : selectedRows),
            okText: `Sure to ${action.action}!!!`,
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
              return request.run({
                uri: action.uri,
                method: action.method,
                type: action.action,
                ids: Object.keys(record).length ? [record.id] : selectedRowKeys,
              });
            },
            onCancel() {},
          });
        }
        break;
      default:
        break;
    }
  }

  function batchOverview(dataSource: BasicListApi.Field[]) {
    return (
      <Table
        size="small"
        rowKey="id"
        columns={tableColumns ? [tableColumns[0] || {}, tableColumns[1] || {}] : []}
        dataSource={dataSource}
        pagination={false}
      />
    );
  }
  const paginationChangeHandler = (page: any, per_page: any) => {
    setPageQuery(`&page=${page}&per_page=${per_page}`);
  };
  const tableChangeHandler = (_: any, __: any, sorter: any) => {
    if (sorter.order === undefined) {
      setSortQuery('');
    } else {
      const orderBy = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSortQuery(`&sort=${sorter.field}&order=${orderBy}`);
    }
  };
  const hideModal = (reload = false) => {
    setModalVisible(false);
    setModalUri('');
    if (reload) {
      init.run();
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: any, _selectedRows: any) => {
      setSelectedRowKeys(_selectedRowKeys);
      setSelectedRows(_selectedRows);
    },
  };

  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>{ActionBuilder(init?.data?.layout?.tableToolBar, actionHandler)}</Space>
        </Col>
      </Row>
    );
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };
  const batchToolbar = () => {
    return (
      selectedRowKeys.length > 0 && (
        <Space>{ActionBuilder(init?.data?.layout?.batchToolBar, actionHandler)}</Space>
      )
    );
  };

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          dataSource={init?.data?.dataSource}
          columns={tableColumns}
          pagination={false}
          loading={init?.loading}
          onChange={tableChangeHandler}
          rowSelection={rowSelection}
        />
        {afterTableLayout()}
      </Card>
      <Modal modalVisible={modalVisible} hideModal={hideModal} modalUri={modalUri} />
      <FooterToolbar extra={batchToolbar()} />
    </PageContainer>
  );
};

export default Index;
