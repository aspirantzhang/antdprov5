export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'model-design',
    icon: 'table',
    path: '/basic-list/api/models/model-design/*',
    component: './ModelDesign',
  },
  {
    path: '/basic-list/api/*/*',
    component: './BasicList/component/Page',
  },
  {
    name: 'basic-list',
    icon: 'table',
    path: '/basic-list/*',
    component: './BasicList',
  },
  {
    path: '/api',
    component: './Api',
    layout: false,
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
