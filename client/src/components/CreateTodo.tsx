import React from 'react';
import { Button, Form, Input } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAntToast } from '../hooks/ant-toast';
import { POST } from '../utilities/fetch';

const CreateTodo: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { showNotification } = useAntToast();

  const todoMutation = useMutation({
    mutationFn: (value: { title: string; }) => POST('/todos', value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      form.resetFields();
      showNotification('success', 'Successfully created Todo!');
    },
    onError: (error) => {
      showNotification('error', 'Error', error.message);
      console.log('error', error);
    },
  });

  return (
    <>
      <h2>Create a new todo</h2>
      <Form
        layout={'vertical'}
        form={form}
        onFinish={todoMutation.mutate}
      >
        <Form.Item label="Todo title" name="title">
          <Input placeholder="Ex: Mow the lawn" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">Create</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateTodo;