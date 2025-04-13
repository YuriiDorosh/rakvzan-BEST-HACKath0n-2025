import { configureStore } from '@reduxjs/toolkit';
import AuthMenuReducer from './store/authMenuSlice';
import DetailMarkReducer from './store/detailMarkerSlice'
import { baseApi } from './baseQuery';

export const store = configureStore({
    reducer: {
      authMenu: AuthMenuReducer,
      detailMarker: DetailMarkReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch