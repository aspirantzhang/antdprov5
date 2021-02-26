declare module BasicListApi {
  type ActionHandler = (action: BasicListApi.Action, record: any) => void;

  type Page = {
    title: string;
    type: string;
    searchBar?: boolean;
    trash?: boolean;
  };

  type Action = {
    component: string;
    text: string;
    type: string;
    action: string;
    uri?: string;
    method?: string;
  };

  type Field = {
    title: string;
    dataIndex: string;
    key: string;
    [key: string]: any;
  };

  type DataSource = {
    [key: string]: any;
  };

  type Meta = {
    total: number;
    per_page: number;
    page: number;
  };

  type Tabs = {
    name: string;
    title: string;
    data: Field[];
  };

  type Actions = {
    name: string;
    title: string;
    data: Action[];
  };

  type ListLayout = {
    tableColumn: Field[];
    tableToolBar: Action[];
    batchToolBar: Action[];
  };

  type PageLayout = {
    tabs: Tabs[];
    actions: Actions[];
  };

  type ListData = {
    page: Page;
    layout: ListLayout;
    dataSource: DataSource[];
    meta: Meta;
  };

  type PageData = {
    page: Page;
    layout: PageLayout;
    dataSource: DataSource;
  };

  type Root = {
    success: boolean;
    message: string;
    data: PageData | ListData;
  };
}
