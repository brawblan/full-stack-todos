import CreateTodo from '../components/CreateTodo';
import Todos from '../components/Todos';
import { useQuery } from '@tanstack/react-query';
import { todosQueryOptions } from '../queries/todos';
import { FileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/todos').createRoute({
  component: TodosView,
  loader: async ({ context: { queryClient } }) => (
    await queryClient.ensureQueryData(todosQueryOptions)
  ),
});

function TodosView() {
  const todosQuery = useQuery(todosQueryOptions);

  return (
    <>
      <CreateTodo />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <h2>Todos</h2>
      </div>
      <Todos todosQuery={todosQuery} />
    </>
  );
}

export default TodosView;
