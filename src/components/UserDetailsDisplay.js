import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bindedActions as usersBindedActions } from '../reducers/usersReducer';
import BlogHeader from './BlogHeader';

const UserDetailsDisplay = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users);

  useEffect(() => {
    dispatch(usersBindedActions.initializeUsers());
  }, []);

  const userId = useParams().id;
  if (!users) return null;
  const targetUser = users.find((user) => user.id === userId);

  const userBlogList = (user) => (
    <>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );

  return (
    <div>
      <BlogHeader />
      <h2>{targetUser.name}</h2>
      <h3>added blogs</h3>
      {userBlogList(targetUser)}
    </div>
  );
};

export default UserDetailsDisplay;
