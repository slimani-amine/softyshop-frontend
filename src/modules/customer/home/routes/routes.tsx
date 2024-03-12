/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthGuard from '@src/modules/shared/guards/AuthGuard';
import { RouteProps } from 'react-router-dom';
import { Fragment, lazy } from 'react';
import GuestGuard from '@src/modules/shared/guards/GuestGuard';
import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout';

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
    path: '/home',
    component: lazy(() => import('../features/Home')),
    layout: GuestLayout,
    roles: ['ADMIN', 'VENDOR'],
  },
];

export default routes;
