import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorFlag, setErrorFlag] = useState();
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

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

  const blogDisplay = () => (
    <>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button type="button" onClick={handleLogout}>logout</button>
      </div>

      <h2>create new</h2>
      <div>
        <form onSubmit={createBlog}>
          <div>
            title <input type="text" value={newBlog.title} onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}/>
          </div>
          <div>
            author <input type="text" value={newBlog.author} onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}/>
          </div>
          <div>
            url <input type="text" value={newBlog.url} onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}/>
          </div>
          <button type="submit">create</button>
        </form>
      </div>

      <div>
        { blogs.map(blog => <Blog key={blog.id} blog={blog}/>) }
      </div>
    </>
  )

  return (
    <div>
      <Notification message={statusMessage} error={errorFlag}/>
      { user ? blogDisplay() : loginForm() }
    </div>
  )
}

export default App
