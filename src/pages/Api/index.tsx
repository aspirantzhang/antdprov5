import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { BasicLayout } from '@ant-design/pro-layout';

const index = () => {
  return (
    <BasicLayout
      pageTitleRender={() => {
        return 'Public Api V2';
      }}
      pure
    >
      <SwaggerUI url="/index/api" />
    </BasicLayout>
  );
};

export default index;
