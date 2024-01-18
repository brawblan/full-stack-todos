import { FileRoute, Link } from '@tanstack/react-router';
import { Button, Card, Space } from 'antd';
import { setServerSession } from '../utilities/auth-data';

export const Route = new FileRoute('/').createRoute({
  component: IndexRoute,
  loader: async ({ location, navigate, context: { auth } }) => {
    const res = await setServerSession(location.href);
    console.log(auth.getState().isAuthenticated);

    if (res?.success) {
      auth.setState({ isAuthenticated: true });
      navigate({
        replace: true,
        to: '/protected/todos'
      });
    }
  }
});

function IndexRoute() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card title="Howdy and Welcome!">
        <Space direction="horizontal" size={16} style={{ width: '100%' }}>
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
          <Link to="/create-account">
            <Button type="primary">Create Account</Button>
          </Link>
        </Space>
      </Card>
    </Space>
  );
}

export default IndexRoute;