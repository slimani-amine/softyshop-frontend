import { RouteProps } from 'react-router-dom';
import { Fragment, lazy } from 'react';
import AuthGuard from '@src/modules/shared/guards/AuthGuard';
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
    guard: AuthGuard,
    path: '/checkout',
    component: lazy(() => import('./Checkout')),
    layout: CustomerLayout,
    roles: ['ADMIN', 'VENDOR'],
  },
];

export default routes;
