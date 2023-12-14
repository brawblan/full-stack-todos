import { Button, Layout, Menu, theme } from 'antd';
import { ToastContainer } from 'react-toastify';
import { Link, Outlet } from '@tanstack/react-router';

const { Header, Content, Footer } = Layout;

const MenuItems = [
  {
    label: (
      <Link to="/todos">
        Todos
      </Link>
    ),
    key: 'Todos',

  },
  {
    label: (
      <Link to="/app-info">
        App Info
      </Link>
    ),
    key: 'App',
  },
  {
    label: (
      <Link to="/profile">
        Profile
      </Link>
    ),
    key: 'Profile',
  },
];

export default function AppLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <ToastContainer />
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', width: '100%' }}>
        <h1 style={{ color: 'white', textWrap: 'nowrap' }}>Full Stack Todo App</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          overflowedIndicator={<Button type="primary">Menu</Button>}
          defaultSelectedKeys={['Todos']}
          items={MenuItems.map(({ key, label }) => {
            return {
              key,
              label,
            };
          })}
        />
      </Header>
      <Content style={{ padding: '2rem 2rem', backgroundColor: colorBgContainer }}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        Brandon Blankenstein - <a href="https://www.blankenstein.dev" target="_blank">blankenstein.dev</a>
      </Footer>
    </Layout>
  );
}