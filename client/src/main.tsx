import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Router, RouterProvider } from '@tanstack/react-router';
import { useAuthStore } from './store/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import './index.css';
import './styles/google-auth-btn.css';

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
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
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
