import axios from 'axios'
const baseUrl = '/api/blogs'

let token;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

// TODO: add creation of blog?

export default { getAll, setToken }