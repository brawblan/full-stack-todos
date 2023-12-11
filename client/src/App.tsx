import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import TodoApp from './components/TodoApp';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}