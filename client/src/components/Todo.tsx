import { useState } from 'react';
import { Button, Switch, Modal } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteOutlined } from '@ant-design/icons';
import { DELETE, PUT } from '../utilities/fetch';
import { useAntToast } from '../hooks/ant-toast';

interface Todo {
  id: number | string;
  title: string;
  completed: boolean;
}

const Todo = ({ id, title, completed }: Todo) => {
  const { showNotification } = useAntToast();
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
    mutationFn: async (todo: Todo) => await PUT('/todos', todo),
    onSuccess: () => {
      showNotification('success', 'Successfully updated Todo!');
    },
    onError: (error: Error) => {
      showNotification('error', 'Error', error.message);
      console.log('error', error);
    },
  });

  const todoDeleteMutation = useMutation({
    mutationFn: async (id: string | number) => await DELETE(`/todos/${id}`),
    onSuccess: () => {
      showNotification('success', 'Successfully deleted Todo!');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: Error) => {
      showNotification('error', 'Error', error.message);
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