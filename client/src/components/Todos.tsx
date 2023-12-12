import { List } from 'antd';
import Todo from './Todo';
import { UseQueryResult } from '@tanstack/react-query';

const Todos = ({ todosQuery }: { todosQuery: UseQueryResult<any, Error>; }) => {
  if (todosQuery.isError) {
    return <div>Error</div>;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={todosQuery.data}
      loading={todosQuery.isLoading}
      pagination={{
        pageSize: 5,
      }}
      // @ts-ignore
      renderItem={({ id, title, completed }) => (
        <List.Item key={`${id}-${title}`}>
          <Todo id={id} title={title} completed={completed} />
        </List.Item>
      )}
    />
  );
};

export default Todos;
