import { RouteProps } from 'react-router-dom';
import { Fragment, lazy } from 'react';
import AuthGuard from '@src/modules/shared/guards/AuthGuard';
// import GuestGuard from '@src/modules/shared/guards/GuestGuard';
// import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout';
import CustomerLayout from '@src/modules/shared/layout/CustomerLayout/CustomerLayout';
import { ADMIN , CUSTOMER, VENDOR} from "@src/global_roles_config";

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
    path: '/books',
    component: lazy(() => import('./AllProducts')),
    layout: CustomerLayout,
    roles: [ADMIN, VENDOR , CUSTOMER],
  },
];

export default routes;
