import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './slices/theme/themeSlice';
import authReducer from '../../auth/data/authSlice';
import roleReducer from '../../auth/data/roleSlice';
import cartReducer from '@src/modules/customer/data/cartSlice';
import productReducer from '@src/modules/customer/data/productSlice';
// import userReducer from '@src/modules/customer/data/userSlice';
// import storeReducer from '@src/modules/customer/data/storeSlice';
import { api } from '../services/api';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  role: roleReducer,
  cart: cartReducer,
  product: productReducer,
  // user: userReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
