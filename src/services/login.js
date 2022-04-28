import axios from 'axios'
const baseUrl = '/api/login';

const login = async (info) => {
  let res = await axios.post(baseUrl, info);
  return res.data;
}

export default { login }