import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'

import { App } from './App'
import { planSearchSchema } from './lib/planUrl'

const rootRoute = createRootRoute({
  component: Outlet,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search) => planSearchSchema.parse(search),
  component: App,
})

const routeTree = rootRoute.addChildren([indexRoute])

function getBasepath() {
  const baseUrl = import.meta.env.BASE_URL
  if (!baseUrl || baseUrl === '/') return '/'
  return baseUrl.replace(/\/$/, '')
}

export const router = createRouter({
  routeTree,
  basepath: getBasepath(),
  defaultPreload: false,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const indexRouteApi = indexRoute
