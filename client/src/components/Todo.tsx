import { useState } from 'react';
import { Button, Switch, Modal } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteOutlined } from '@ant-design/icons';

const BASE_URL = import.meta.env.API_URL || 'http://localhost:1200';

interface Todo {
  id: number | string;
  title: string;
  completed: boolean;
}

const Todo = ({ id, title, completed }: Todo) => {
  const queryClient = useQueryClient();
  const [checked, setChecked] = useState(completed);
  // #region Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    setIsModalOpen(false);
    todoDeleteMutation.mutate(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // #endregion Modal

  const todoUpdateMutation = useMutation({
    mutationFn: (todo: Todo) => {
      return fetch(`${BASE_URL}/todos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      toast("Successfully updated Todo!", {
        type: 'success',
        theme: 'dark',
      });
    },
    onError: (error) => {
      toast("There was an error updating the Todo.");
      console.log('error', error);
    },
  });

  const todoDeleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      return await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    },
    onSuccess: () => {
      toast("Successfully deleted Todo!", {
        type: 'success',
        theme: 'dark',
      });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      toast("There was an error deleting the Todo.");
      console.log('error', error);
    },
  });

  const onChange = (checked: boolean) => {
    setChecked(checked);
    todoUpdateMutation.mutate({ id, title, completed: checked });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
      <Switch value={checked} onChange={onChange} />
      <h3 style={{ textDecoration: `${checked ? 'line-through' : 'none'}` }}>{title}</h3>
      {checked && <Button type="primary" danger icon={<DeleteOutlined />} onClick={showModal}>Delete</Button>}
      <Modal title="Delete todo?" okButtonProps={{ danger: true }} open={isModalOpen} onOk={handleDelete} onCancel={handleCancel}>
        <p>Are you sure you want to delete this todo?</p>
      </Modal>
    </div>
  );
};

export default Todo;