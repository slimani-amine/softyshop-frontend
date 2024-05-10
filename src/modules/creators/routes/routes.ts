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
    path: "/authors",
    component: lazy(() => import("../features/creatorsList/creatorList")),
    layout: MainLayout,
    roles: [VENDOR, ADMIN],
  },
  {
    exact: true,
    guard: AuthGuard,
    path: "/authors/create",
    component: lazy(() => import("../features/creatorsCreate/creatorCreate")),
    layout: MainLayout,
    roles: [VENDOR, ADMIN],
  },
  {
    exact: true,
    guard: AuthGuard,
    path: "/authors/edit/:id",
    component: lazy(() => import("../features/creatorEdit/creatorEdit")),
    layout: MainLayout,
    roles: [VENDOR, ADMIN],
  },
];

export default routes;
