import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deletePost, updatePost } from '../model/postSlice';
import { addComment, deleteComment } from '../../comment/model/commentSlice';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import styles from './PostCard.module.scss';

interface PostCardProps {
  postId: string;
  text: string;
}

export const PostCard: React.FC<PostCardProps> = ({ postId, text }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) =>
    state.comments.comments.filter((c) => c.postId === postId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleUpdate = () => {
    dispatch(updatePost({ id: postId, text: editedText }));
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ postId, text: newComment }));
      setNewComment('');
    }
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <div className={styles.editBlock}>
          <Input value={editedText} onChange={(e) => setEditedText(e.target.value)} />
          <Button onClick={handleUpdate}>Сохранить</Button>
        </div>
      ) : (
        <p className={styles.text}>{text}</p>
      )}

      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => setShowComments(!showComments)}>
          {showComments ? 'Спрятать' : 'Комментарии'}
        </Button>
        <span className={styles.commentCount}>Количество комментариев - {comments.length}</span>
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Изменить
        </Button>
        <Button variant="danger" onClick={() => dispatch(deletePost(postId))}>
          Удалить
        </Button>
      </div>

      {showComments && (
        <div className={styles.commentsBlock}>
          <div className={styles.addComment}>
            <Input
              placeholder="Новый комментарий ..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment}>Добавить</Button>
          </div>

          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <span>{comment.text}</span>
              <Button variant="danger" onClick={() => dispatch(deleteComment(comment.id))}>
                Удалить
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};