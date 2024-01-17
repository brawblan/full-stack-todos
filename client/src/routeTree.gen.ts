import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedImport } from './routes/protected'
import { Route as LoginImport } from './routes/login'
import { Route as CreateAccountImport } from './routes/create-account'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as ProtectedTodosImport } from './routes/protected.todos'
import { Route as ProtectedProfileImport } from './routes/protected.profile'
import { Route as ProtectedAppInfoImport } from './routes/protected.app-info'

const ProtectedRoute = ProtectedImport.update({
  path: '/protected',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const CreateAccountRoute = CreateAccountImport.update({
  path: '/create-account',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedTodosRoute = ProtectedTodosImport.update({
  path: '/todos',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedProfileRoute = ProtectedProfileImport.update({
  path: '/profile',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedAppInfoRoute = ProtectedAppInfoImport.update({
  path: '/app-info',
  getParentRoute: () => ProtectedRoute,
} as any)
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/create-account': {
      preLoaderRoute: typeof CreateAccountImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/protected': {
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/protected/app-info': {
      preLoaderRoute: typeof ProtectedAppInfoImport
      parentRoute: typeof ProtectedImport
    }
    '/protected/profile': {
      preLoaderRoute: typeof ProtectedProfileImport
      parentRoute: typeof ProtectedImport
    }
    '/protected/todos': {
      preLoaderRoute: typeof ProtectedTodosImport
      parentRoute: typeof ProtectedImport
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthRoute,
  CreateAccountRoute,
  LoginRoute,
  ProtectedRoute.addChildren([
    ProtectedAppInfoRoute,
    ProtectedProfileRoute,
    ProtectedTodosRoute,
  ]),
])
