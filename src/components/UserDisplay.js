import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogHeader from './BlogHeader';
import { bindedActions as usersBindedActions } from '../reducers/usersReducer';

const userTable = (users) => {
  console.log('users');
  console.log(users);
  const style = { display: 'flex', justifyContent: 'end' };

  if (!users) return null;

  return (
    <>
      <h2>Users</h2>
      <br />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .slice()
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map(({ id, name, blogs }) => (
              <tr key={id}>
                <td>
                  <Link to={`/users/${id}`}>{name}</Link>
                </td>
                <td style={style}>{blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

const UserDisplay = () => {
  const users = useSelector(({ users }) => users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersBindedActions.initializeUsers());
  }, []);

  return (
    <div>
      <BlogHeader />
      {userTable(users)}
    </div>
  );
};

export default UserDisplay;
