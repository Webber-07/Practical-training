import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AddPostForm } from '../features/add-post/ui/AddPostForm';
import { PostCard } from '../entities/post/ui/PostCard';
import { useAppSelector } from './hooks';
import styles from './App.module.scss';

const PostList: React.FC = () => {
  const posts = useAppSelector((state) => state.posts.posts);

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <PostCard key={post.id} postId={post.id} text={post.text} />
      ))}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <AddPostForm />
        <PostList />
      </div>
    </Provider>
  );
};