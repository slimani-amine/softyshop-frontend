/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, Fragment } from 'react'
import { Routes, Route, RouteProps } from 'react-router-dom'

import pages from './routes'
import LazyLoad from '../components/LazyLoad/LazyLoad'
const Current_User = "ADMIN"
localStorage.setItem('Current_User',Current_User)
type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment
  layout?: React.ComponentType<any> | typeof Fragment
  roles? : string[]
} & RouteProps

export const renderRoutes = (routes: RouteConfig[] = []) => (
  <Suspense fallback={<LazyLoad />}>
    <Routes>
      {routes.map((route, index) => {
        
        const Component = route.component
        const Guard = route?.guard || Fragment
        const Layout = route?.layout || Fragment
        const roles = route?.roles
        const allowedRoles = roles && roles.includes(Current_User)
        console.log(allowedRoles)

        if (allowedRoles) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Guard>
                  <Layout>
                    <Component />
                  </Layout>
                </Guard>
              }
            />
          )
        } else {
    
           return <Route
           key={index}
           path={'*'}
           element={
            
                 <Component propos='401' />
              
           }
         />
            
          
        }
      })}
    </Routes>
  </Suspense>
)

const routes: RouteConfig[] = [...pages]

export default routes
