import { queryOptions } from '@tanstack/react-query';
import { GET } from '../utilities/fetch';

export const todosQueryOptions = queryOptions({
  queryKey: ['todos'],
  queryFn: async () => await GET('/todos/all'),
});
