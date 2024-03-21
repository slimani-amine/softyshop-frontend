import sharedRoutes from './sharedRoutes';
import authRoutes from '../../auth/routes/routes';
import dashboardRoutes from '../../dashboard/routes/routes';
import productRoutes from '../../products/routes/routes';
import categoryRoutes from '../../categories/routes/routes';
import homeRoutes from '../../customer/home/routes/routes';
import bookstoreRoutes from '../../bookStores/routes/routes';
import allProductsRoutes from '../../customer/allProducts/routes';
const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...homeRoutes,
  ...dashboardRoutes,
  ...productRoutes,
  ...categoryRoutes,
  ...bookstoreRoutes,
  ...allProductsRoutes,
];

export default routes;
