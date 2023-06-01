import React, { Children } from 'react';
import loadable from "@loadable/component";

const lazyLoad = (id: number, moduleName: string) => {
    if (id === 1) {
        const Module = loadable(() => import(`../pages/${moduleName}`))
        return <Module />
    }
    const Module = loadable(() => import(`../components/${moduleName}`))
    return <Module />
}

const Layout = loadable(() => import('../layout'))

const routes: Array<routers> = [
    {
        id: '1',
        text: '登录',
        path: 'register',
        element: lazyLoad(1, 'Register')
    },
    {
        id: '2',
        text: '注册',
        path: '/',
        element: lazyLoad(1, 'Login')
    },
    {
        id: '3',
        text: '首页',
        path: 'home',
        element: <Layout />,
        children: [
            {
                id: '31',
                text: '音乐',
                path: 'music',
                children: [
                    {
                        id: '31-1',
                        text: '歌单',
                        path: 'songlist',
                        element: lazyLoad(1, 'RecommendedSongList')
                    },
                    {
                        id: '31-2',
                        text: '个人推荐',
                        path: 'personalrec',
                        element: lazyLoad(1, 'Personalrec')
                    },
                    {
                        id: '31-3',
                        text: '热门歌曲',
                        path: 'ppularsongs',
                        element: lazyLoad(1, 'Hotsongs')
                    }

                ]
            }
        ]
    }
]

export default routes