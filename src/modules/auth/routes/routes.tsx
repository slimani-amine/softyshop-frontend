/* eslint-disable @typescript-eslint/no-explicit-any */
import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout';
import GuestGuard from '../../shared/guards/GuestGuard';
import { Navigate, RouteProps } from 'react-router-dom';
import { Fragment, lazy } from 'react';
import { PATH } from './paths';
import AuthGuard from '@src/modules/shared/guards/AuthGuard';

type RouteConfig = {
  exact: boolean | null;
  path: string;
  component: React.ComponentType<any>;
  guard?: React.ComponentType<any> | typeof Fragment | any;
  layout?: React.ComponentType<any> | typeof Fragment;
  roles: string[];
} & RouteProps;

const routes: RouteConfig[] = [
  // GuestGuard Routes
  {
    exact: true,
    path: PATH.ROOT,
    guard: AuthGuard,
    roles: ['VENDOR', 'ADMIN'],
    component: () => <Navigate to="/home" />,
  },
  {
    roles: ['VENDOR', 'ADMIN'],

    exact: true,
    guard: GuestGuard,
    path: PATH.LOGIN,
    component: lazy(() => import('../features/Login/Login')),
    layout: GuestLayout,
  },
  {
    roles: ['VENDOR', 'ADMIN'],

    exact: true,
    guard: GuestGuard,
    path: PATH.REGISTER,
    component: lazy(() => import('../features/Register/Register')),
    layout: GuestLayout,
  },
  {
    roles: ['VENDOR', 'ADMIN'],

    exact: true,
    guard: GuestGuard,
    path: PATH.ROLE,
    component: lazy(() => import('../features/Role/Role')),
    layout: GuestLayout,
  },
  {
    roles: ['VENDOR', 'ADMIN'],

    exact: true,
    guard: GuestGuard,
    path: PATH.RESET,
    component: lazy(() => import('../features/ResetPassword/ResetPassword')),
    layout: GuestLayout,
  },
  {
    roles: ['VENDOR', 'ADMIN'],

    exact: true,
    guard: GuestGuard,
    path: PATH.ENTER_NEW_PASSWORD,
    component: lazy(
      () => import('../features/EnterNewPassword/EnterNewPassword')
    ),
    layout: GuestLayout,
  },
];

export default routes;
