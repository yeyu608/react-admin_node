import React, { useState, useEffect } from 'react';
import './homepage.scss'
import routes from '../router/routerList'
import { Link, Outlet, useLocation } from "react-router-dom"

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const HomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const aa = pathname.split('/').reverse()
  console.log(aa)

  // 动态生成面包屑导航
  const tab = routes.filter(item => item.path === aa[2])[0].children
  const tab1 = tab?.map(item => {
    if (item.path === aa[1]) {
      return <Link to={'/home/' + item.path + '/songlist'} key={item.id}>{item.text}</Link>
    }
    return
  })

  console.log(tab1)

  const tabi = tab?.filter(item => item.path === aa[1])[0]
  
  console.log(tabi)
  const tab2 = tabi?.children?.map(item=>{
    if (item.path === aa[0]) {
      return <Link to={'/home/' + tabi.path + '/' + item.path} key={item.id}>{item.text}</Link>
    }
    return
  })

  // 动态生成侧边栏路由导航
  const routerList = (routes: Array<routers>) => {
    return routes.map(item => {
      if (item.children) {
        return getItem(item.text, item.id, item.icon, item.children.map(eve => getItem(<Link to={item.path + '/' + eve.path}>{eve.text}</Link>, eve.id)))
      }
      return getItem(item.text, item.id, item.icon)
    })
  }

  const navList = routes.filter(item => { return item.id === '3' })[0].children
  //console.log(navList)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={routerList(navList as Array<routers>)} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{tab1}</Breadcrumb.Item>
            <Breadcrumb.Item>{tab2 && tab2}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
