import { Button, Checkbox, Form, Input } from 'antd';
import { useAuthStore } from '../store/auth';
import { FileRoute, useRouter } from '@tanstack/react-router';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const Route = new FileRoute('/signin').createRoute({
  component: SigninView,
});

function SigninView() {
  const [login] = useAuthStore((state) => [state.login]);
  const router = useRouter();

  const onFinish = (values: any) => {
    login(values.username);
    router.navigate({
      to: '/todos',
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
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

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SigninView;