import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import { updateNotification } from './reducers/notificationReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState('');
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const dispatch = useDispatch();
  const togglableRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    (async () => {
      let blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      let user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      dispatch(
        updateNotification({ message: 'Wrong Credentials', error: true })
      );
      setTimeout(
        () => dispatch(updateNotification({ message: null, error: null })),
        5000
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
    setUser('');
  };

  const createBlog = async (event) => {
    event.preventDefault();
    togglableRef.current.toggleVisibility();

    try {
      await blogService.create(newBlog);
      let blogs = await blogService.getAll();
      setBlogs(blogs);
      dispatch(
        updateNotification({
          message: `new blog added - ${newBlog.title} by ${newBlog.author}`,
          error: false,
        })
      );
      setNewBlog({ title: '', author: '', url: '' });
    } catch (err) {
      dispatch(
        updateNotification({ message: 'Fail to create blog', error: true })
      );
    }
    setTimeout(
      () => dispatch(updateNotification({ message: null, error: null })),
      5000
    );
  };

  const updateBlog = async (update) => {
    try {
      await blogService.update(update);
      let blogs = await blogService.getAll();
      setBlogs(blogs);
      setNewBlog({ title: '', author: '', url: '' });
    } catch (err) {
      dispatch(
        updateNotification({ message: 'Fail to create blog', error: true })
      );
    }
    setTimeout(
      () => dispatch(updateNotification({ message: null, error: null })),
      5000
    );
  };

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }

    try {
      await blogService.remove(blog);
      let blogs = await blogService.getAll();
      setBlogs(blogs);
      dispatch(
        updateNotification({
          message: `blog deleted - ${blog.title} by ${blog.author}`,
          error: false,
        })
      );
    } catch (err) {
      dispatch(
        updateNotification({ message: 'Fail to delete blog', error: true })
      );
    }
    setTimeout(
      () => dispatch(updateNotification({ message: null, error: null })),
      5000
    );
  };

  const blogDisplay = () => (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in{' '}
        <button type='button' onClick={handleLogout}>
          logout
        </button>
      </div>
      <br />
      <Togglable ref={togglableRef} buttonLabel='new note'>
        <BlogForm
          onSubmit={createBlog}
          newBlog={newBlog}
          handleChange={setNewBlog}
        />
      </Togglable>
      <div>
        {blogs
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
      {user ? blogDisplay() : loginForm()}
    </div>
  );
};

export default App;
