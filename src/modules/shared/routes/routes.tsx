import sharedRoutes from './sharedRoutes';
import authRoutes from '../../auth/routes/routes';
import checkoutRoutes from '../../customer/checkout/routes';
import allProductsRoutes from '../../customer/allProducts/routes';
import homeRoutes from '../../customer/home/routes/routes';
import dashboardRoutes from '../../dashboard/routes/routes';
import productRoutes from '../../products/routes/routes';
import categoryRoutes from '../../categories/routes/routes';
import bookstoreRoutes from '../../bookStores/routes/routes';
import vendorRoutes from '../../vendores/routes/routes';
import creatorRoutes from '../../creators/routes/routes';
import brandRoutes from '../../brands/routes/routes';
import orderRoutes from '../../orders/routes/routes';
import paymentRoutes from '../../payment/routes/routes';

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...homeRoutes,
  ...allProductsRoutes,
  ...checkoutRoutes,
  ...dashboardRoutes,
  ...productRoutes,
  ...categoryRoutes,
  ...bookstoreRoutes,
  ...vendorRoutes,
  ...creatorRoutes,
  ...brandRoutes,
  ...orderRoutes,
  ...paymentRoutes,
];

export default routes;
