import { useDispatch, useSelector } from 'react-redux';
import { bindedActions as userBindedActions } from '../reducers/userReducer';
import { Link } from 'react-router-dom';

const BlogHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user || null);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(userBindedActions.clearUserInfo());
  };

  const navBarStyle = { backgroundColor: 'grey', paddingTop: 7, paddingBottom: 7 };

  return (
    <div style={navBarStyle}>
      <span style={{ margin: 2 }}>
        <Link to={'/'}>blogs</Link>
      </span>
      <span style={{ margin: 2 }}>
        <Link to={'/users'}>users</Link>
      </span>
      <span style={{ margin: 2 }}>{user.name} logged in </span>
      <button type='button' onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default BlogHeader;
