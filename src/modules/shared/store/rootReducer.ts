import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './slices/theme/themeSlice';
import authReducer from '../../auth/data/authSlice';
import roleReducer from '../../auth/data/roleSlice';
import cartReducer from '@src/modules/customer/data/cartSlice';
import productReducer from '@src/modules/customer/data/productSlice';
import drawerReducer from '@src/modules/customer/data/drawerSlice';
import checkoutReducer from '@src/modules/customer/data/checkoutSlice';
import { api } from '../services/api';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  role: roleReducer,
  cart: cartReducer,
  product: productReducer,
  drawer: drawerReducer,
  checkout: checkoutReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
