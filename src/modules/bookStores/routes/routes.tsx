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
  roles?: string[];
} & RouteProps;

const routes: RouteConfig[] = [
  // AuthGuard Routes
  {
    exact: true,
    guard: AuthGuard,
    path: "/stores",
    component: lazy(() => import("../feature/bookStore_list/bookStoreList")),
    layout: MainLayout,
    roles: [ADMIN, VENDOR],
  },
  {
    exact: true,
    guard: AuthGuard,
    path: "/stores/create",
    component: lazy(
      () => import("../feature/bookStore_create/bookStoreCreate"),
    ),
    layout: MainLayout,
    roles: [ADMIN, VENDOR],
  },
  {
    exact: true,
    guard: AuthGuard,
    path: "/stores/edit/:id",
    component: lazy(() => import("../feature/bookStore_edit/bookStoreEdit")),
    layout: MainLayout,
    roles: [ADMIN, VENDOR],
  },
];

export default routes;
