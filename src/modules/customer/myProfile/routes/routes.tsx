/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthGuard from "@src/modules/shared/guards/AuthGuard";
import { RouteProps } from "react-router-dom";
import { Fragment, lazy } from "react";
import { ADMIN, VENDOR, CUSTOMER } from "@src/global_roles_config";
import CustomerLayout from "@src/modules/shared/layout/CustomerLayout/CustomerLayout";

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
    path: "/my-profile",
    component: lazy(() => import("../features/MyProfile")),
    layout: CustomerLayout,
    roles: [ADMIN, VENDOR, CUSTOMER],
  },
];

export default routes;
