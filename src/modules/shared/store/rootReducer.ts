import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './slices/theme/themeSlice';
import authReducer from '../../auth/data/authSlice';
import roleReducer from '../../auth/data/roleSlice';
import cartReducer from '@src/modules/customer/data/cartSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  role: roleReducer,
  cart: cartReducer,
});

export default rootReducer;
