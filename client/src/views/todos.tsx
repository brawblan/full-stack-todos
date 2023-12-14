import CreateTodo from '../components/CreateTodo';
import Todos from '../components/Todos';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../utilities/fetch';

function TodosView() {
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => GET('/todos/all'),
  });

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
