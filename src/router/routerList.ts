import React from 'react';
import loadable from "@loadable/component";


const Register = loadable(() => import('../pages/Register'))

const Login = loadable(() => import('../pages/Login'))

export const routes: Array<routers> = [
    {
        id: 1,
        text: '登录',
        path: 'register',
        element: React.lazy(()=>import('../pages/register'))
    },
    {
        id: 2,
        text: '注册',
        path: 'login',
        element: Login
    }
]