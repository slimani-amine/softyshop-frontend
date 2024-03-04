import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './slices/theme/themeSlice';
import authReducer from '../../auth/data/authSlice';
import roleReducer from '../../auth/data/roleSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  role: roleReducer,
});

export default rootReducer;
