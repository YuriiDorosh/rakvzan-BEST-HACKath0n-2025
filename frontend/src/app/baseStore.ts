import { configureStore } from '@reduxjs/toolkit';
import AuthMenuReducer from './store/authMenuSlice';

export const store = configureStore({
    reducer: {
      authMenu: AuthMenuReducer,
    },
  });
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch