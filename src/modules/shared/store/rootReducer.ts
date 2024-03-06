import { combineReducers } from '@reduxjs/toolkit'
import {ProductsApi} from '../../products/data/productSlice'
import themeReducer from './slices/theme/themeSlice'
import authReducer from '../../auth/data/authSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  products: ProductsApi.reducer,
})

export default rootReducer
 