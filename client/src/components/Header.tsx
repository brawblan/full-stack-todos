import { Link } from '@tanstack/react-router';
import { Menu, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useAuthStore } from '../store/auth';
import { useEffect, useRef, useState } from 'react';

const MenuItems = [
  {
    label: (
      <Link to="/protected/todos">
        Todos
      </Link>
    ),
    key: 'Todos',

  },
  {
    label: (
      <Link to="/protected/app-info">
        App Info
      </Link>
    ),
    key: 'App',
  },
  {
    label: (
      <Link to="/protected/profile">
        Profile
      </Link>
    ),
    key: 'Profile',
  },
];

enum HeaderText {
  isLarge = 'Full Stack Todo App',
  isSmall = 'FS Todo App',
}

const fontSmall = { fontSize: '16px', fontWeight: 'normal' };
const fontLarge = { fontSize: '24px', fontWeight: 'bold' };

export default function TodoHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const [isAuthenticated] = useAuthStore((state) => [state.isAuthenticated]);
  const [headerText, setHeaderText] = useState<HeaderText>(HeaderText['isLarge']);
  const [headerTextFont, setHeaderTextFont] = useState(fontLarge);

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.borderBoxSize[0].inlineSize > 425) {
        setHeaderText(HeaderText['isLarge']);
        setHeaderTextFont(fontLarge);
      } else {
        setHeaderText(HeaderText['isSmall']);
        setHeaderTextFont(fontSmall);
      }
    }
  });

  useEffect(() => {
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    () => resizeObserver.disconnect();
  }, [resizeObserver]);

  return (
    <Header ref={ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <div style={{ color: 'white', textWrap: 'nowrap', textDecoration: 'underline', ...headerTextFont }}>{headerText}</div>
      {isAuthenticated && (
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