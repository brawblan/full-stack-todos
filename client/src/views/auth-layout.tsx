import { Layout, theme } from 'antd';
import { ToastContainer } from 'react-toastify';
import { Outlet } from '@tanstack/react-router';

const { Header, Content, Footer } = Layout;

export default function AuthLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <ToastContainer />
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', width: '100%' }}>
        <h1 style={{ color: 'white', textWrap: 'nowrap' }}>Full Stack Todo App</h1>
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