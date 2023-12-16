import { Route as rootRoute } from './routes/root';
import { Route as AuthenticationRoute } from './routes/auth';
import { Route as SigninRoute } from './views/signin';
import { Route as SignupRoute } from './views/signup';
import { Route as ProtectedRoute } from './routes/protected';
import { Route as TodosRoute } from './views/todos';
import { Route as ProfileRoute } from './views/profile';
import { Route as AppInfoRoute } from './views/app-info';

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      parentRoute: typeof rootRoute;
    };
    "/signin": {
      parentRoute: typeof AuthenticationRoute;
    };
    "/signup": {
      parentRoute: typeof AuthenticationRoute;
    };
    "/todos": {
      parentRoute: typeof ProtectedRoute;
    };
    "/profile": {
      parentRoute: typeof ProtectedRoute;
    };
    "/app-info": {
      parentRoute: typeof ProtectedRoute;
    };
  }
}

Object.assign(AuthenticationRoute.options, {
  path: '/',
  getParentRoute: () => rootRoute,
});

Object.assign(SigninRoute.options, {
  path: '/signin',
  getParentRoute: () => AuthenticationRoute,
});

Object.assign(SignupRoute.options, {
  path: '/signup',
  getParentRoute: () => AuthenticationRoute,
});

Object.assign(ProtectedRoute.options, {
  id: 'protected',
  getParentRoute: () => rootRoute,
});

Object.assign(TodosRoute.options, {
  path: '/todos',
  getParentRoute: () => ProtectedRoute,
});

Object.assign(ProfileRoute.options, {
  path: '/profile',
  getParentRoute: () => ProtectedRoute,
});

Object.assign(AppInfoRoute.options, {
  path: '/app-info',
  getParentRoute: () => ProtectedRoute,
});

export const routeTree = rootRoute.addChildren([
  AuthenticationRoute.addChildren([
    SigninRoute,
    SignupRoute,
  ]),
  ProtectedRoute.addChildren([
    TodosRoute,
    ProfileRoute,
    AppInfoRoute,
  ]),
]);