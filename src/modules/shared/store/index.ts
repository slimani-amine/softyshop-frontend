import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { ProductsApi } from '@src/modules/products/service/productApi';
import { StoreApi } from '@src/modules/bookStores/service/storeApi';
export const store = configureStore({
  reducer: rootReducer,
  devTools: !!import.meta.env.VITE_APP_ENABLE_REDUX_DEVTOOLS || false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      ProductsApi.middleware,
      StoreApi.middleware,
    ] as any),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
