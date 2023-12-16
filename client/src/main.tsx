import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Router, RouterProvider } from '@tanstack/react-router';
import { useAuthStore } from './store/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const auth = useAuthStore;
const queryClient = new QueryClient();

export const router = new Router({
  routeTree,
  context: {
    auth,
    queryClient
  },
});

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ auth }} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
