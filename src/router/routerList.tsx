import React, { Children } from 'react';
import loadable from "@loadable/component";

const lazyLoad = (moduleName:string) => {
    const Module = loadable(()=>import(`../pages/${moduleName}`))

    return <Module/>
}

const Layout = loadable(() => import('../layout'))

const routes: Array<routers> = [
    {
        id: '1',
        text: '登录',
        path: 'register',
        element: lazyLoad('Register')
    },
    {
        id: '2',
        text: '注册',
        path: '/',
        element: lazyLoad('Login')
    }
    {
        id: '3',
        text: '首页',
        path: 'home',
        element: <Layout/>,
        children:[
            {
                id:'31',
                text:'用户信息',
                path:'user',
                element:lazyLoad('Login')
            }
        ]
    }
]

export default routes