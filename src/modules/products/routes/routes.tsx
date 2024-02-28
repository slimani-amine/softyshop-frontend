/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout'
import AuthGuard from '@src/modules/shared/guards/AuthGuard'
import { RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  // AuthGuard Routes
  {
    exact: true,
    guard: AuthGuard,
    path: '/vendor/products',
    component: lazy(() => import('../features/product_list/ProductList')),
    layout: MainLayout,
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/vendor/products/create',
    component: lazy(() => import('../features/create_product/CreateProduct')),
    layout: MainLayout,
  },
]

export default routes
