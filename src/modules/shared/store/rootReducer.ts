import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './slices/theme/themeSlice';
import authReducer from '../../auth/data/authSlice';
import roleReducer from '../../auth/data/roleSlice';
import { api } from '../services/api';

const rootReducer = combineReducers({
  
  theme: themeReducer,
  auth: authReducer,
  role: roleReducer,
  [api.reducerPath]: api.reducer,

});

export default rootReducer;
