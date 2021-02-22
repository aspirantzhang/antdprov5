import moment from 'moment';
import { Space, Tag } from 'antd';
import ActionBuilder from './ActionBuilder';

const ColumnBuilder = (tableColumn: BasicListApi.TableColumn[] | undefined) => {
  const newColumns: BasicListApi.TableColumn[] = [];
  (tableColumn || []).forEach((column) => {
    if (column.hideInColumn !== true) {
      switch (column.type) {
        case 'datetime':
          column.render = (value: any) => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
          };
          break;
        case 'switch':
          column.render = (value: any) => {
            const option = (column.data || []).find((item) => item.value === value);
            return <Tag color={value ? 'blue' : 'red'}>{option?.title}</Tag>;
          };
          break;
        case 'actions':
          column.render = () => {
            return <Space>{ActionBuilder(column.actions)}</Space>;
          };
          break;

        default:
          break;
      }
      newColumns.push(column);
    }
  });

  const idColumn: BasicListApi.TableColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
    },
  ];

  return idColumn.concat(newColumns);
};

export default ColumnBuilder;
