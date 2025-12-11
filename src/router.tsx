import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import {PrimeReactProvider} from 'primereact/api'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { useAuthStore } from './stores.ts/authStore'


const authIsAuthenticated=useAuthStore.getState().isAuthenticated
const authUser=useAuthStore.getState().user
// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: { ...rqContext ,isAuthenticated:authIsAuthenticated,currentUser:authUser},
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <PrimeReactProvider>
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
        </PrimeReactProvider>
      )
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}
