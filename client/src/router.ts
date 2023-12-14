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
import { Auth, useAuthStore } from './store/auth.ts';
import { UseBoundStore, StoreApi } from 'zustand';
import SigninView from './views/signin.tsx';
import SignupView from './views/signup.tsx';

export const rootRoute = rootRouteWithContext<{
  useAuthStore: UseBoundStore<StoreApi<Auth>>;
}>()({
  component: App,
});

export const authenticationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
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

export const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'protected',
  beforeLoad: async ({ context }) => {
    console.log(context.useAuthStore.getState());

    if (context.useAuthStore.getState().status === 'loggedOut') {
      throw redirect({
        to: signinRoute.to,
      });
    }

    return {
      username: useAuthStore.getState().username,
    };
  },
});

export const routeTree = rootRoute.addChildren([
  protectedRoute,
  authenticationRoute.addChildren([
    signinRoute,
    signupRoute,
  ]),
  todosRoute,
  profileRoute,
  appInfoRoute,
]);

export const router = new Router({
  routeTree,
  context: {
    useAuthStore,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}