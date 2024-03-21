import { RouteProps } from 'react-router-dom';
import { Fragment, lazy } from 'react';
// import AuthGuard from '@src/modules/shared/guards/AuthGuard';
import GuestGuard from '@src/modules/shared/guards/GuestGuard';
// import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout';
import CustomerLayout from '@src/modules/shared/layout/CustomerLayout/CustomerLayout';

type RouteConfig = {
  exact: boolean | null;
  path: string;
  component: React.ComponentType<any>;
  guard?: React.ComponentType<any> | typeof Fragment | any;
  layout?: React.ComponentType<any> | typeof Fragment;
  roles: string[];
} & RouteProps;

const routes: RouteConfig[] = [
  //AuthGuard Routes
  {
    exact: true,
    guard: GuestGuard,
    path: '/products',
    component: lazy(() => import('./AllProducts')),
    layout: CustomerLayout,
    roles: ['ADMIN', 'VENDOR'],
  },
];

export default routes;
