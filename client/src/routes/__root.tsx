import { Auth } from '../store/auth';
import { Outlet, rootRouteWithContext } from '@tanstack/react-router';
import { StoreApi, UseBoundStore } from 'zustand';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '../index.css';
import TodoHeader from '../components/Header';
import TodoFooter from '../components/Footer';
import { Layout, theme } from 'antd';
import { useAntToast } from '../hooks/ant-toast';

const { Content } = Layout;

export const Route = rootRouteWithContext<{
  auth: UseBoundStore<StoreApi<Auth>>;
  queryClient: QueryClient;
}>()({
  component: AppRoot,
});

export default function AppRoot() {
  const { contextHolder } = useAntToast();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {contextHolder}
      <Layout className="layout">
        <TodoHeader />
        <Content style={{ padding: '2rem 2rem', backgroundColor: colorBgContainer }}>
          <div className="site-layout-content">
            <Outlet />
          </div>
        </Content>
        <TodoFooter />
        <ReactQueryDevtools buttonPosition="bottom-right" />
      </Layout>
    </>
  );
}

