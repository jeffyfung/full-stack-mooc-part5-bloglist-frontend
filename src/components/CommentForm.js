import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindedActions } from '../reducers/blogReducer';

const CommentForm = ({ blog }) => {
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    let update = { id: blog.id, comment: newComment };
    dispatch(bindedActions.addBlogComment(update));
    setNewComment('');
  };

  return (
    <>
      <h2>comments</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
            onSubmit={handleSubmit}
          />
          <button type='submit'>add comment</button>
        </form>
      </div>
      <div>
        <ul>
          {blog.comments ? blog.comments.map((comment, i) => <li key={i}>{comment}</li>) : null}
        </ul>
      </div>
    </>
  );
};

export default CommentForm;
