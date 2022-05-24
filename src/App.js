import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import loginService from './services/login';
import Notification from './components/Notification';
import UserDisplay from './components/UserDisplay';
import UserDetailsDisplay from './components/UserDetailsDisplay';
import { updateNotification } from './reducers/notificationReducer';
import { bindedActions as blogBindedActions } from './reducers/blogReducer';
import { bindedActions as userBindedActions } from './reducers/userReducer';

import { Routes, Route } from 'react-router-dom';
import BlogHeader from './components/BlogHeader';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const dispatch = useDispatch();
  const togglableRef = useRef();

  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user || null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(userBindedActions.initializeUser(user));
    }
  }, []);

  useEffect(() => {
    dispatch(blogBindedActions.initializeBlogs());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      let user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      dispatch(userBindedActions.initializeUser(user));
      setUsername('');
      setPassword('');
    } catch (err) {
      dispatch(updateNotification({ message: 'Wrong Credentials', error: true }));
      setTimeout(() => dispatch(updateNotification({ message: null, error: null })), 5000);
    }
  };

  const createBlog = async (event) => {
    event.preventDefault();
    togglableRef.current.toggleVisibility();

    try {
      dispatch(blogBindedActions.createNewBlog(newBlog));
      dispatch(
        updateNotification({
          message: `new blog added - ${newBlog.title} by ${newBlog.author}`,
          error: false,
        })
      );
      setNewBlog({ title: '', author: '', url: '' });
    } catch (err) {
      dispatch(updateNotification({ message: 'Fail to create blog', error: true }));
    }
    setTimeout(() => dispatch(updateNotification({ message: null, error: null })), 5000);
  };

  const updateBlog = async (update) => {
    try {
      dispatch(blogBindedActions.updateBlog(update));
      setNewBlog({ title: '', author: '', url: '' });
    } catch (err) {
      dispatch(updateNotification({ message: 'Fail to create blog', error: true }));
    }
    setTimeout(() => dispatch(updateNotification({ message: null, error: null })), 5000);
  };

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }

    try {
      dispatch(blogBindedActions.deleteBlog(blog));
      dispatch(
        updateNotification({
          message: `blog deleted - ${blog.title} by ${blog.author}`,
          error: false,
        })
      );
    } catch (err) {
      dispatch(updateNotification({ message: 'Fail to delete blog', error: true }));
    }
    setTimeout(() => dispatch(updateNotification({ message: null, error: null })), 5000);
  };

  const blogDisplay = () => (
    <div>
      <BlogHeader />
      <br />
      {blogList()}
    </div>
  );

  const blogList = () => (
    <div>
      <Togglable ref={togglableRef} buttonLabel='new note'>
        <BlogForm onSubmit={createBlog} newBlog={newBlog} handleChange={setNewBlog} />
      </Togglable>
      <div>
        {[...blogs]
          .sort((blog1, blog2) => parseInt(blog2.likes) - parseInt(blog1.likes))
          .map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              updateBlog={updateBlog}
              handleBlogDelete={deleteBlog}
            />
          ))}
      </div>
    </div>
  );

  const loginForm = () => (
    <>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <button type='submit'>login</button>
      </form>
    </>
  );

  return (
    <div>
      <Notification />
      <Routes>
        <Route path='/' element={user.token ? blogDisplay() : loginForm()} />
        <Route path='/users' element={<UserDisplay />} />
        <Route path='/users/:id' element={<UserDetailsDisplay />} />
      </Routes>
    </div>
  );
};

export default App;
