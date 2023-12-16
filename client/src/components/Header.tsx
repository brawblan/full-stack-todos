import { Link } from '@tanstack/react-router';
import { Menu, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useAuthStore } from '../store/auth';

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

export default function TodoHeader() {
  const auth = useAuthStore((state) => state);

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <h1 style={{ color: 'white', textWrap: 'nowrap' }}>Full Stack Todo App</h1>
      {auth.status === 'loggedIn' && (
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
      )}
    </Header>
  );
}