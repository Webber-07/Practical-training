import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../entities/post/model/postSlice';
import commentReducer from '../entities/comment/model/commentSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;