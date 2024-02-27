import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import dashboardRoutes from '../../dashboard/routes/routes'
import ProductRoutes from '../../products/routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...dashboardRoutes , ...ProductRoutes]

export default routes
