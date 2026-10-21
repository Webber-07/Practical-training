import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from './types';

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<string>) => {
      state.posts.push({
        id: Date.now().toString(),
        text: action.payload,
      });
    },
    updatePost: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const post = state.posts.find((p) => p.id === action.payload.id);
      if (post) {
        post.text = action.payload.text;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
