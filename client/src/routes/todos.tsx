import CreateTodo from '../components/CreateTodo';
import Todos from '../components/Todos';
import { useQuery } from '@tanstack/react-query';
import { todosQueryOptions } from '../queries/todos';
import { FileRoute } from '@tanstack/react-router';
import { checkIsAuthenticated } from '../utilities/user';
import { useEffect, useState } from 'react';

export const Route = new FileRoute('/todos').createRoute({
  component: TodosView,
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(todosQueryOptions);
  },
});

function TodosView() {
  const todosQuery = useQuery(todosQueryOptions);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => setIsAuthenticated(await checkIsAuthenticated()))();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <>
          <CreateTodo />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <h2>Todos</h2>
          </div>
          <Todos todosQuery={todosQuery} />
        </>
      ) : (
        <div>Login to add todos!</div>
      )}
    </>
  );
}

export default TodosView;
