import axios from 'axios'
const baseUrl = '/api/blogs'

let token;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
}

const create = async (blog) => {
  let config = { headers: { Authorization: token }};
  const res = await axios.post(baseUrl, blog, config);
  return res.data;
}

const update = async (update) => {
  let config = { headers: { Authorization: token }};
  const res = await axios.put(baseUrl + '/' + update._id, update, config);
  return res.data
}

const remove = async (blog) => {
  let config = { headers: { Authorization: token }};
  await axios.delete(baseUrl + '/' + blog.id, config);
}

export default { setToken, getAll, create, update, remove }