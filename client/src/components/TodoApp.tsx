import React from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import TodoForm from './Form';
import Todos from './Todos';
import { ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../utilities/fetch';

const { Header, Content, Footer } = Layout;

const MenuItems = [
  {
    label: 'Todos',
    key: 'Todos',
  },
  {
    label: 'Profile',
    key: 'Profile',
  },
  {
    label: 'App',
    key: 'App',
  },
];

const TodoApp: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => GET('/todos/all'),
  });

  return (
    <Layout className="layout">
      <ToastContainer />
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', position: 'fixed', left: 0, right: 0 }}>
        <h1 style={{ color: 'white', textWrap: 'nowrap' }}>Full Stack Todo App</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          overflowedIndicator={<Button type="primary">Menu</Button>}
          defaultSelectedKeys={['1']}
          items={MenuItems.map(({ key, label }) => {
            return {
              key,
              label,
            };
          })}
        />
      </Header>
      <Content style={{ padding: '5rem 2rem', backgroundColor: colorBgContainer }}>
        <div className="site-layout-content">
          <TodoForm />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <h2>Todos</h2>
          </div>
          <Todos todosQuery={todosQuery} />
        </div>
      </Content>
      <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        Brandon Blankenstein - <a href="https://www.blankenstein.dev" target="_blank">blankenstein.dev</a>
      </Footer>
    </Layout>
  );
};

export default TodoApp;
