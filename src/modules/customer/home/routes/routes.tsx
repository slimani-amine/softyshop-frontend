import { RouteProps } from 'react-router-dom';
import { Fragment, lazy } from 'react';
import AuthGuard from '@src/modules/shared/guards/AuthGuard';
import CustomerLayout from '@src/modules/shared/layout/CustomerLayout/CustomerLayout';
<<<<<<< HEAD
import { ADMIN, VENDOR, CUSTOMER } from '@src/global_roles_config';
=======
import { ADMIN , CUSTOMER, VENDOR } from "@src/global_roles_config";
>>>>>>> ba64723d407e15ceae794ee5d7737fc28bb83b88

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
    layout: CustomerLayout,
    roles: [ADMIN, VENDOR, CUSTOMER],
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/home/:storeId',
    component: lazy(() => import('../../storeDetails/storeDetails')),
    layout: CustomerLayout,
<<<<<<< HEAD
    roles: [ADMIN, VENDOR, CUSTOMER],
=======
    roles: [ADMIN, VENDOR,CUSTOMER],
>>>>>>> ba64723d407e15ceae794ee5d7737fc28bb83b88
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/home/:storeId/:productId',
    component: lazy(() => import('../../productDetails/ProductDetails')),
    layout: CustomerLayout,
<<<<<<< HEAD
    roles: [ADMIN, VENDOR, CUSTOMER],
=======
    roles: [ADMIN, VENDOR,CUSTOMER],
>>>>>>> ba64723d407e15ceae794ee5d7737fc28bb83b88
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/books/:productId',
    component: lazy(() => import('../../productDetails/ProductDetails')),
    layout: CustomerLayout,
<<<<<<< HEAD
    roles: [ADMIN, VENDOR, CUSTOMER],
=======
    roles: [ADMIN, VENDOR,CUSTOMER],
>>>>>>> ba64723d407e15ceae794ee5d7737fc28bb83b88
  },
];

export default routes;
