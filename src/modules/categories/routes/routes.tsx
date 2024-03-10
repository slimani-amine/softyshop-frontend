/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "@src/modules/shared/layout/MainLayout/MainLayout";
import AuthGuard from "@src/modules/shared/guards/AuthGuard";
import { RouteProps } from "react-router-dom";
import { Fragment, lazy } from "react";

type RouteConfig = {
  exact: boolean | null;
  path: string;
  component: React.ComponentType<any>;
  guard?: React.ComponentType<any> | typeof Fragment | any;
  layout?: React.ComponentType<any> | typeof Fragment;
  roles : string[];
} & RouteProps;

const routes: RouteConfig[] = [
  // AuthGuard Routes
  {
    exact: true,
    guard: AuthGuard,
    path: "/categories",
    component: lazy(() => import("../features/category_list/CategoryList")),
    layout: MainLayout,
    roles: ["ADMIN"],
  },
  {
    exact: true,
    guard: AuthGuard,
    path: "/categories/create",
    component: lazy(() => import("../features/category_create/CategoryCreate")),
    layout: MainLayout,
    roles: ["ADMIN"]
  },
  {
    exact: true,
    guard: AuthGuard,
    path: "/categories/edit/:ida",
    component: lazy(() => import("../features/category_edit/CategoryEdit")),
    layout: MainLayout,
    roles: ["ADMIN"],
  },

];

export default routes;
