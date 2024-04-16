import sharedRoutes from './sharedRoutes';
import authRoutes from '../../auth/routes/routes';
import dashboardRoutes from '../../dashboard/routes/routes';
import productRoutes from '../../products/routes/routes';
import categoryRoutes from '../../categories/routes/routes';
import homeRoutes from '../../customer/home/routes/routes';
import bookstoreRoutes from '../../bookStores/routes/routes';
import allProductsRoutes from '../../customer/allProducts/routes';
import vendorRoutes from '../../vendores/routes/routes';
import creatorRoutes from '../../creators/routes/routes';
import brandRoutes from '../../brands/routes/routes';
import orderRoutes from '../../orders/routes/routes';

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...homeRoutes,
  ...dashboardRoutes,
  ...productRoutes,
  ...categoryRoutes,
  ...bookstoreRoutes,
  ...allProductsRoutes,
  ...vendorRoutes,
  ...creatorRoutes,
  ...brandRoutes,
  ...orderRoutes,
];

export default routes;
