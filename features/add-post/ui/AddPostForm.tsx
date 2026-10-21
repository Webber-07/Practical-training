import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { addPost } from '../../../entities/post/model/postSlice';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import styles from './AddPostForm.module.scss';

export const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      dispatch(addPost(text));
      setText('');
    }
  };

  return (
    <div className={styles.form}>
      <Input
        placeholder="Новый пост ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSubmit}>Добавить</Button>
    </div>
  );
};