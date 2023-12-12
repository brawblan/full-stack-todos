import React from 'react';
import { Button, Form, Input } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { POST } from '../utilities/fetch';

const TodoForm: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const todoMutation = useMutation({
    mutationFn: (value: { title: string; }) => POST('/todos', value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      form.resetFields();
      toast("Successfully created Todo!", {
        type: 'success',
        theme: 'dark',
      });
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return (
    <>
      <h2>Create a new todo</h2>
      <Form
        layout={'horizontal'}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
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

export default TodoForm;