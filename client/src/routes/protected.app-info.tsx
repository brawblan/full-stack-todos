import { Collapse, Divider, List } from 'antd';
import { FileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/protected/app-info').createRoute({
  component: AppInfoView,
});

const frontendData = [
  'React',
  'TypeScript',
  'Vite',
  'Ant Design',
  'Tanstack Query',
  'Tanstack Router',
  'React Toastify',
];

const backendData = [
  'Node.js',
  'Express',
  'TypeScript',
  'Cors',
  'Helmet',
  'Morgan',
  'Dotenv',
  'Nodemon',
  'Jest',
  'Supertest',
];

const deploymentData = [
  'Netlify',
  'Render',
  'Supabase',
  'GitHub',
];

export default function AppInfoView() {
  return (
    <>
      <Divider orientation="left">Frontend</Divider>
      <Collapse
        items={[{
          key: '1', label: 'This is what was used to create the user interface.', children: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="https://github.com/brawblan/full-stack-todos/tree/main/client" target="_blank" rel="noreferrer">
                Frontend repo
              </a>
              <List
                size="large"
                bordered
                dataSource={frontendData}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          )
        }]}
      />
      <Divider orientation="left">Backend</Divider>
      <Collapse
        items={[{
          key: '1', label: 'This is what was used to create the API for authentication and todos.', children: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="https://github.com/brawblan/full-stack-todos/tree/main/server" target="_blank" rel="noreferrer">
                Backend repo
              </a>
              <List
                size="large"
                bordered
                dataSource={backendData}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          )
        }]}
      />
      <Divider orientation="left">Deployment</Divider>
      <Collapse
        items={[{
          key: '1', label: 'This is what was used to deploy this full stack application.', children: (
            <List
              size="large"
              bordered
              dataSource={deploymentData}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          )
        }]}
      />
    </>
  );
};
