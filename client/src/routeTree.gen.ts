import { Route as rootRoute } from './routes/__root'
import { Route as TodosImport } from './routes/todos'
import { Route as LoginImport } from './routes/login'
import { Route as CreateAccountImport } from './routes/create-account'
import { Route as AppInfoImport } from './routes/app-info'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'

const TodosRoute = TodosImport.update({
  path: '/todos',
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

const AppInfoRoute = AppInfoImport.update({
  path: '/app-info',
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
    '/app-info': {
      preLoaderRoute: typeof AppInfoImport
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
    '/todos': {
      preLoaderRoute: typeof TodosImport
      parentRoute: typeof rootRoute
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthRoute,
  AppInfoRoute,
  CreateAccountRoute,
  LoginRoute,
  TodosRoute,
])
