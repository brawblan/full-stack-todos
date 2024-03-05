import { Link } from '@tanstack/react-router';
import { Menu, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useEffect, useRef, useState } from 'react';
import LogoutBtn from './LogoutBtn';

enum HeaderText {
  isLarge = 'Full Stack Todo App',
  isSmall = 'FS Todo App',
}

const fontSmall = { fontSize: '16px', fontWeight: 'normal' };
const fontLarge = { fontSize: '24px', fontWeight: 'bold' };

export default function TodoHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const [headerText, setHeaderText] = useState<HeaderText>(HeaderText['isLarge']);
  const [headerTextFont, setHeaderTextFont] = useState(fontLarge);

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
        <LogoutBtn />
      ),
      key: 'Logout',
    },
  ];

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
  });

  return (
    <Header ref={ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <Link to="/" style={{ color: 'white', textWrap: 'nowrap', textDecoration: 'underline', ...headerTextFont }}>{headerText}</Link>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ width: '100%', justifyContent: 'flex-end' }}
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
  );
}