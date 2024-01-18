import { FileRoute, Link } from '@tanstack/react-router';
import { Form, Input, Card, Space, Tooltip } from 'antd';
import { usePasswordValidation } from '../hooks/password-validation';
import { useEmailValidation } from '../hooks/email-validation';
import { SubmitButton } from '../components/SubmitButton';
import { useMutation } from '@tanstack/react-query';
import { POST } from '../utilities/fetch';
import { toast } from 'react-toastify';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { setServerSession } from '../utilities/auth-data';
import { router } from '../main';
import { SuccessResponse, ErrorResponse } from '../types/Response';
import { AuthData } from '../types/Auth';
import { useAuthStore } from '../store/auth';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
};

type CreateAccountSuccessResponse = SuccessResponse<{ session: AuthData; }>;

export const Route = new FileRoute('/create-account').createRoute({
  component: CreateAccountView,
});

function CreateAccountView() {
  const [form] = Form.useForm<{ email: string; password: string; }>();
  const [login] = useAuthStore((state) => [state.login]);
  const { emailIsValid, emailErrorMessage, validateEmail } = useEmailValidation();
  const { passwordIsValid, passwordErrorMessage, validatePassword } = usePasswordValidation();

  const createAccountMutation = useMutation({
    mutationFn: async () => await POST('/auth/createAccount', {
      email: form.getFieldValue('email'),
      password: form.getFieldValue('password')
    }),
    onSuccess: (response: CreateAccountSuccessResponse | ErrorResponse) => {
      setServerSession((response as CreateAccountSuccessResponse).data.session);

      login();

      router.navigate({
        to: '/protected/todos',
      });

      toast("Successfully create an account! Check email for verification email.", {
        type: 'success',
        theme: 'dark',
      });
    },
    onError: (error) => {
      toast(error.message, {
        type: 'error',
        theme: 'dark',
      });
    }
  });

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card title="Create Account">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={() => createAccountMutation.mutate()}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            hasFeedback
            help={emailErrorMessage}
            rules={[{
              required: true,
              message: 'Please input your email!',
              validator: (_, value) => {
                validateEmail(value);
                if (emailIsValid(value)) {
                  return Promise.resolve();
                }

                return Promise.reject(emailErrorMessage);
              }
            }]}
          >
            <Input />
          </Form.Item>

          <Tooltip title="Password must be at least 8 characters, contain at least one number, one special character, one uppercase letter, one lowercase letter, and no spaces">
            <Form.Item<FieldType>
              label="Password"
              name="password"
              hasFeedback
              help={passwordErrorMessage}
              rules={[{
                required: true,
                validator: (_, value) => {
                  validatePassword(value);
                  if (passwordIsValid(value)) {
                    return Promise.resolve();
                  }

                  return Promise.reject(passwordErrorMessage);
                },
              }]}
            >
              <Input.Password />
            </Form.Item>
          </Tooltip>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <SubmitButton form={form} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <GoogleLoginButton authType="createAccount" />
          </Form.Item>
        </Form>
      </Card>
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </Space>
  );
}


export default CreateAccountView;