import {
  Router,
  Route,
  redirect,
  rootRouteWithContext,
} from '@tanstack/react-router';
import App from './App.tsx';
import './index.css';
import TodosView from './views/todos.tsx';
import AppInfoView from './views/app-info.tsx';
import ProfileView from './views/profile.tsx';
import SigninView from './views/signin.tsx';
import SignupView from './views/signup.tsx';
import { Auth, useAuthStore } from './store/auth.ts';
import { UseBoundStore, StoreApi } from 'zustand';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const rootRoute = rootRouteWithContext<{
  useAuthStore: UseBoundStore<StoreApi<Auth>>;
}>()({
  component: App,
});

//#region Authentication routes
export const authenticationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: ({ navigate }) => {
    if (useAuthStore.getState().status === 'loggedIn') {
      throw redirect({
        to: todosRoute.to,
      });
    } else {
      navigate({
        replace: true,
        to: signinRoute.to,
      });
    }
  }
});

export const signinRoute = new Route({
  getParentRoute: () => authenticationRoute,
  path: '/signin',
  component: SigninView,
});

export const signupRoute = new Route({
  getParentRoute: () => authenticationRoute,
  path: '/signup',
  component: SignupView,
});
//#endregion

//#region Protected routes
export const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'protected',
  beforeLoad: async ({ context }) => {
    if (context.useAuthStore.getState().status === 'loggedOut') {
      throw redirect({
        replace: true,
        to: signinRoute.to,
      });
    }

    return {
      context,
    };
  },
});

export const todosRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/todos',
  component: TodosView,
});

export const profileRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/profile',
  component: ProfileView,
});

export const appInfoRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/app-info',
  component: AppInfoView,
});
//#endregion

export const routeTree = rootRoute.addChildren([
  authenticationRoute.addChildren([
    signinRoute,
    signupRoute,
  ]),
  protectedRoute.addChildren([
    todosRoute,
    profileRoute,
    appInfoRoute,
  ]),
]);

export const router = new Router({
  routeTree,
  context: {
    useAuthStore,
  },
});
