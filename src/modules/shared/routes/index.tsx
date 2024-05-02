/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, Fragment } from 'react';
import { Routes, Route, RouteProps } from 'react-router-dom';

import pages from './routes';
import LazyLoad from '../components/LazyLoad/LazyLoad';


type RouteConfig = {
  exact: boolean | null;
  path: string;
  component: React.ComponentType<any>;
  guard?: React.ComponentType<any> | typeof Fragment;
  layout?: React.ComponentType<any> | typeof Fragment;
  roles?: string[];
} & RouteProps;

export const renderRoutes = (routes: RouteConfig[] = [], role: string) => {
  // Filter routes based on whether the user's role is included in the allowed roles
  
  const filteredRoutes = routes.filter((route) => {
    return route.roles && route.roles.includes(role);
  });
console.log(filteredRoutes)
  return (
    <Suspense fallback={<LazyLoad />}>
      <Routes>
        {filteredRoutes.map((route, index) => {
          const Component = route.component;
          const Guard = route?.guard || Fragment;
          const Layout = route?.layout || Fragment;

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
          );
        })}
      </Routes>
    </Suspense>
  );
};

const routes: RouteConfig[] = [...pages];

export default routes;
