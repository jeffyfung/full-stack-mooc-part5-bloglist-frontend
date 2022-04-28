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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);      
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log('User being logged in');
    try {
      let user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
    setUser('');
  }

  const loginForm = () => (
    <>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password 
          <input type="text" value={password} name="password" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <br/>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogDisplay = () => (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <br/>
      <button type="button" onClick={handleLogout}>logout</button>
    </>
  )

  return (
    <div>
      <Notification message={errorMessage}/>
      { user ? blogDisplay() : loginForm() }
    </div>
  )
}

export default App
