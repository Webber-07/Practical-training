import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Comment } from './types';

interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ postId: string; text: string }>) => {
      state.comments.push({
        id: Date.now().toString(),
        postId: action.payload.postId,
        text: action.payload.text,
      });
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;