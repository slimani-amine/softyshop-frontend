/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "@src/modules/shared/layout/MainLayout/MainLayout";
import AuthGuard from "@src/modules/shared/guards/AuthGuard";
import { RouteProps } from "react-router-dom";
import { Fragment, lazy } from "react";
import { ADMIN, VENDOR } from "@src/global_roles_config";

type RouteConfig = {
  exact: boolean | null;
  path: string;
  component: React.ComponentType<any>;
  guard?: React.ComponentType<any> | typeof Fragment | any;
  layout?: React.ComponentType<any> | typeof Fragment;
  roles: string[];
} & RouteProps;

const routes: RouteConfig[] = [
  // AuthGuard Routes
  {
    exact: true,
    guard: AuthGuard,
    path: "/orders/create",
    component: lazy(() => import("../features/order_create/createOrder")),
    layout: MainLayout,
    roles: [VENDOR, ADMIN],
  },
  {
    exact: true,
    guard: AuthGuard,
    path: "/orders",
    component: lazy(() => import("../features/order_list/OrderList")),
    layout: MainLayout,
    roles: [VENDOR, ADMIN],
  },
];

export default routes;
