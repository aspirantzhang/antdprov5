import React from 'react';
import type { Settings as LayoutSettings, MenuDataItem } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { ResponseError } from 'umi-request';
import {
  currentUser as queryCurrentUser,
  currentMenu as queryCurrentMenu,
} from './services/ant-design-pro/api';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  currentMenu?: MenuDataItem[];
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchMenu?: () => Promise<MenuDataItem[] | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  const fetchMenu = async () => {
    try {
      const currentMenu = await queryCurrentMenu();
      return currentMenu;
    } catch (error) {
      message.error('Get menu data failed.', 10);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login' && history.location.pathname !== '/api') {
    const currentUser = await fetchUserInfo();
    const currentMenu = await fetchMenu();
    return {
      fetchUserInfo,
      fetchMenu,
      currentUser,
      currentMenu,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    fetchMenu,
    settings: {},
  };
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (
        !initialState?.currentUser &&
        location.pathname !== '/user/login' &&
        location.pathname !== '/api'
      ) {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    menuDataRender: () => {
      return initialState?.currentMenu || [];
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: ResponseError) => {
  switch (error.name) {
    case 'BizError':
      if (error.data.message) {
        message.error({
          content: error.data.message,
          key: 'process',
          duration: 20,
        });
      } else {
        message.error({
          content: 'Business Error, please try again.',
          key: 'process',
          duration: 20,
        });
      }
      break;
    case 'ResponseError':
      message.error({
        content: `${error.response.status} ${error.response.statusText}. Please try again.`,
        key: 'process',
        duration: 20,
      });
      break;
    case 'TypeError':
      message.error({
        content: `Network error. Please try again.`,
        key: 'process',
        duration: 20,
      });
      break;
    default:
      break;
  }

  throw error;
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  errorHandler,
};
