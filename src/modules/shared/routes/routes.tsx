import sharedRoutes from './sharedRoutes';
import authRoutes from '../../auth/routes/routes';
import dashboardRoutes from '../../dashboard/routes/routes';
import productRoutes from '../../products/routes/routes';
import categoryRoutes from '../../categories/routes/routes';
import homeRoutes from '../../customer/home/routes/routes';

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...productRoutes,
  ...categoryRoutes,
  ...homeRoutes,
];
console.log(authRoutes);
export default routes;
