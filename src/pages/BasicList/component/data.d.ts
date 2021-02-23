declare module PageApi {
  export interface Page {
    title: string;
    type: string;
  }

  export interface Datum2 {
    id: number;
    parent_id: number;
    name: string;
    create_time: Date;
    delete_time?: any;
    status: number;
    value: number;
    title: string;
    depth: number;
  }

  export interface Datum {
    title: string;
    dataIndex: string;
    key: string;
    type: string;
    disabled: boolean;
    data: Datum2[];
  }

  export interface Tab {
    name: string;
    title: string;
    data: Datum[];
  }

  export interface Datum3 {
    component: string;
    text: string;
    type: string;
    action: string;
    uri: string;
    method: string;
  }

  export interface Action {
    name: string;
    title: string;
    data: Datum3[];
  }

  export interface Layout {
    tabs: Tab[];
    actions: Action[];
  }

  export interface DataSource {
    id: number;
    username: string;
    display_name: string;
    create_time: Date;
    update_time: Date;
    status: number;
    groups: number[];
  }

  export interface Data {
    page: Page;
    layout: Layout;
    dataSource: DataSource;
  }

  export interface RootObject {
    success: boolean;
    message: string;
    data: Data;
  }
}
