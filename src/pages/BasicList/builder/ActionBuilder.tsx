import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';

const ActionBuilder = (
  actions: BasicListApi.Action[] | undefined,
  actionHandler: BasicListApi.ActionHandler,
  loading = false,
  record = {},
) => {
  return (actions || []).map((action) => {
    if (action.component === 'button') {
      return (
        <Button
          key={action.text}
          type={action.type as ButtonType}
          onClick={() => {
            actionHandler(action, record);
          }}
          loading={loading}
          className={`btn-${action.text.toLowerCase().replace(' ', '-')}`}
        >
          {action.text}
        </Button>
      );
    }
    return null;
  });
};
export default ActionBuilder;
