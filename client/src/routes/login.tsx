import { Button, Card, Form, Input, Space } from 'antd';
import { useAuthStore } from '../store/auth';
import { FileRoute, Link, useRouter } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { POST } from '../utilities/fetch';
import { toast } from 'react-toastify';
import { GoogleLoginButton } from '../components/GoogleLoginButton';

type FieldType = {
  email?: string;
  password?: string;
};

export const Route = new FileRoute('/login').createRoute({
  component: LoginView,
});

function LoginView() {
  const [form] = Form.useForm<{ email: string; password: string; }>();
  const [login] = useAuthStore((state) => [state.login]);
  const router = useRouter();

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const loginMutation = useMutation({
    mutationFn: async () => await POST('/auth/login', {
      email: form.getFieldValue('email'),
      password: form.getFieldValue('password')
    }),
    onSuccess: () => {
      console.log('success');

      login();
      router.navigate({
        to: '/protected/todos',
      });
    },
    onError: (error) => {
      console.log('error', error);

      toast(error.message, {
        type: 'error',
        theme: 'dark',
      });
    }
  });

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card title="Login">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={() => loginMutation.mutate()}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <GoogleLoginButton authType="login" />
          </Form.Item>
        </Form>
      </Card>
      <div>
        Need an account? <Link to="/create-account">Create an account</Link>
      </div>
    </Space>
  );
};

export default LoginView;