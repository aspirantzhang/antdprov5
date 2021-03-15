export const schemaExample = {
  routeName: 'admins',
  fields: [
    { name: 'nickname', title: 'Nick Name', type: 'text', editDisabled: true },
    { name: 'gender', title: 'Gender', type: 'radio' },
    { name: 'married', title: 'Married', type: 'switch', hideInColumn: true },
  ],
  listAction: [
    {
      title: 'Edit',
      type: 'primary',
      action: 'modal',
      uri: '/api/admins/:id',
      method: 'get',
    },
    {
      title: 'Page Edit',
      type: 'default',
      action: 'page',
      uri: '/api/admins/:id',
      method: 'get',
    },
    {
      method: 'post',
      title: 'Delete',
      type: 'default',
      action: 'delete',
      uri: '/api/admins/delete',
    },
  ],
  addAction: [
    {
      title: 'Reset',
      type: 'dashed',
      action: 'reset',
      method: 'get',
    },
    {
      title: 'Cancel',
      type: 'default',
      action: 'cancel',
      method: 'get',
    },
    {
      title: 'Submit',
      type: 'primary',
      action: 'submit',
      uri: '/api/admins',
      method: 'post',
    },
  ],
  editAction: [
    {
      title: 'Reset',
      type: 'dashed',
      action: 'reset',
      method: 'get',
    },
    {
      title: 'Cancel',
      type: 'default',
      action: 'cancel',
      method: 'get',
    },
    {
      title: 'Submit',
      type: 'primary',
      action: 'submit',
      uri: '/api/admins/:id',
      method: 'put',
    },
  ],
  tableToolbar: [
    {
      title: 'Add',
      type: 'primary',
      action: 'modal',
      uri: '/api/admins/add',
      method: 'get',
    },
    {
      title: 'Page Add',
      type: 'default',
      action: 'page',
      uri: '/api/admins/add',
      method: 'get',
    },
    {
      title: 'Reload',
      type: 'default',
      action: 'reload',
      method: 'get',
    },
  ],
  batchToolbar: [
    {
      title: 'Delete',
      type: 'danger',
      action: 'delete',
      uri: '/api/admins/delete',
      method: 'post',
    },
    {
      title: 'Disabled',
      type: 'default',
      action: 'disabled',
      uri: '/api/admins/disable',
      method: 'post',
    },
  ],
  batchToolbarTrashed: [
    {
      title: 'Delete Permanently',
      type: 'danger',
      action: 'deletePermanently',
      method: 'post',
      uri: '/api/admins/delete',
    },
    {
      title: 'Restore',
      type: 'default',
      action: 'restore',
      uri: '/api/admins/restore',
      method: 'post',
    },
  ],
};
