import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import AppLayout from './views/app-layout';
import AuthLayout from './views/auth-layout';
import { useAuthStore } from './store/auth';

export default function App() {
  const queryClient = new QueryClient();
  const auth = useAuthStore((state) => state);

  return (
    <QueryClientProvider client={queryClient}>
      {auth.status === 'loggedIn' ? <AppLayout /> : <AuthLayout />}
    </QueryClientProvider>
  );
}
