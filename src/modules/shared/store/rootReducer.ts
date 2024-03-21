import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './slices/theme/themeSlice';
import authReducer from '../../auth/data/authSlice';
import roleReducer from '../../auth/data/roleSlice';
import cartReducer from '@src/modules/customer/data/cartSlice';
import storeReducer from '@src/modules/customer/data/storeSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  role: roleReducer,
  stores: storeReducer,
  cart: cartReducer,
});

export default rootReducer;
