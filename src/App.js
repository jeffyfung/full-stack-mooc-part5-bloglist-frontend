import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorFlag, setErrorFlag] = useState();
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

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
      setErrorFlag(true);
      setStatusMessage('Wrong Credentials');
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
    setUser('');
  }

  const createBlog = async (event) => {
    event.preventDefault();
    togglableRef.current.toggleVisibility();

    try {
      await blogService.create(newBlog);
      let blogs = await blogService.getAll();
      setBlogs(blogs);
      setErrorFlag(false);
      setStatusMessage(`new blog added - ${newBlog.title} by ${newBlog.author}`);
      setNewBlog({ title: '', author: '', url: '' });
    } catch (err) {
      setErrorFlag(true);
      setStatusMessage('Fail to create blog');
    }
    setTimeout(() => setStatusMessage(null), 5000);
  }

  const updateBlog = async (update) => {
    try {
      await blogService.update(update);
      let blogs = await blogService.getAll();
      setBlogs(blogs);
      setErrorFlag(false);
      setStatusMessage(`new blog added - ${newBlog.title} by ${newBlog.author}`);
      setNewBlog({ title: '', author: '', url: '' });
    } catch (err) {
      setErrorFlag(true);
      setStatusMessage('Fail to create blog');
    }
    setTimeout(() => setStatusMessage(null), 5000);
  }

  const blogDisplay = () => (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button type="button" onClick={handleLogout}>logout</button>
      </div>
      <br/>
      <Togglable ref={togglableRef} buttonLabel1='new note' buttonLabel2='create'>
        <BlogForm onSubmit={createBlog} newBlog={newBlog} handleChange={setNewBlog} />  
      </Togglable>
      <div>
        { blogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>) }
      </div>
    </div>
  )

  const loginForm = () => (
    <>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <br/>
        <button type="submit">login</button>
      </form>
    </>
  )

  return (
    <div>
      <Notification message={statusMessage} error={errorFlag}/>
      { user 
        ? blogDisplay()
        : loginForm() }
    </div>
  )
}

export default App
