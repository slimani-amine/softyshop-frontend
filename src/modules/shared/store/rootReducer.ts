import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './slices/theme/themeSlice';
import authReducer from '../../auth/data/authSlice';
import roleReducer from '../../auth/data/roleSlice';
import cartReducer from '@src/modules/customer/data/cartSlice';
import productReducer from '@src/modules/customer/data/productSlice';
import drawerReducer from '@src/modules/customer/data/drawerSlice';
import checkoutReducer from '@src/modules/customer/data/checkoutSlice';
import addressReducer from '@src/modules/customer/data/addressSlice';
import userReducer from '@src/modules/customer/data/userSlice';
import orderReducer from '@src/modules/customer/data/orderSlice';
import brandReducer from '../components/customerLayout/data/brandSlice';
import { api } from '../services/api';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  role: roleReducer,
  cart: cartReducer,
  product: productReducer,
  drawer: drawerReducer,
  checkout: checkoutReducer,
  address: addressReducer,
  user: userReducer,
  order: orderReducer,
  brand: brandReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
