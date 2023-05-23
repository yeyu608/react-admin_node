import React, { Children } from 'react';
import loadable from "@loadable/component";

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  } from '@ant-design/icons';

const Register = loadable(() => import('../pages/Register'))

const Login = loadable(() => import('../pages/Login'))

const routes: Array<routers> = [
    {
        id: 1,
        text: '登录',
        path: 'register',
        element: loadable(() => import('../pages/Register'))
    },
    {
        id: 2,
        text: '注册',
        path: '/',
        element: loadable(() => import('../pages/Login'))
    }
    {
        id: 3,
        text: '首页',
        path: 'home',
        element: loadable(() => import('../layout')),
        
    }
]

export default routes