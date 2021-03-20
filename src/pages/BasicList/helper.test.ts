import { setFieldsAdaptor } from './helper';
import moment from 'moment';

const setFieldsAdaptorParams = {
  layout: {
    tabs: [
      {
        name: 'basic',
        title: 'Basic',
        data: [
          {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            type: 'text',
            disabled: true,
          },
          {
            title: 'Display Name',
            dataIndex: 'display_name',
            key: 'display_name',
            type: 'text',
          },
          {
            title: 'Group',
            dataIndex: 'groups',
            key: 'groups',
            type: 'tree',
            data: [
              {
                id: 69,
                parent_id: 0,
                name: 'Group 001',
                create_time: '2020-11-24T15:25:11+08:00',
                delete_time: null,
                status: 1,
                value: 69,
                title: 'Group 001',
                depth: 1,
              },
              {
                id: 68,
                parent_id: 0,
                name: 'Group 0033',
                create_time: '2020-11-02T16:11:24+08:00',
                delete_time: null,
                status: 1,
                value: 68,
                title: 'Group 0033',
                depth: 1,
              },
              {
                id: 53,
                parent_id: 0,
                name: 'Admin Group',
                create_time: '2020-09-21T00:10:30+08:00',
                delete_time: null,
                status: 1,
                value: 53,
                title: 'Admin Group',
                depth: 1,
              },
            ],
          },
          {
            title: 'Create Time',
            dataIndex: 'create_time',
            key: 'create_time',
            type: 'datetime',
          },
          {
            title: 'Update Time',
            dataIndex: 'update_time',
            key: 'update_time',
            type: 'datetime',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            type: 'switch',
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
          },
          {
            title: 'TextArea',
            dataIndex: 'textarea',
            key: 'textarea',
            type: 'textarea',
          },
        ],
      },
    ],
  },
  dataSource: {
    id: 206,
    username: 'admin0',
    display_name: '',
    create_time: moment('2020-10-22T15:38:51+08:00'),
    update_time: '2020-10-31T13:28:21+08:00',
    status: 1,
    groups: [53],
    textarea: {
      routeName: 'users',
      number: 100,
    },
  },
};

const setFieldsAdaptorResult = {
  username: 'admin0',
  display_name: '',
  create_time: moment('2020-10-22T15:38:51+08:00'),
  update_time: moment('2020-10-31T13:28:21+08:00'),
  status: 1,
  groups: [53],
  textarea: JSON.stringify({
    routeName: 'users',
    number: 100,
  }),
};

describe('setFieldsAdaptor', () => {
  test('Invalid parameter should return empty object', () => {
    expect(setFieldsAdaptor(null as any)).toEqual({});
    expect(setFieldsAdaptor([] as any)).toEqual({});
    expect(setFieldsAdaptor({} as any)).toEqual({});
    expect(setFieldsAdaptor(undefined as any)).toEqual({});
  });
  test('Valid parameter should return correct object', () => {
    expect(setFieldsAdaptor(setFieldsAdaptorParams as any)).toEqual(setFieldsAdaptorResult);
  });
});
