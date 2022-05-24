import { useDispatch, useSelector } from 'react-redux';
import { bindedActions as userBindedActions } from '../reducers/userReducer';

const BlogHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user || null);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(userBindedActions.clearUserInfo());
  };

  return (
    <>
      <h2>Blogs</h2>
      <div>
        {user.name} logged in{' '}
        <button type='button' onClick={handleLogout}>
          logout
        </button>
      </div>
    </>
  );
};

export default BlogHeader;
