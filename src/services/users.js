import axios from 'axios';
const baseUrl = '/api/users';

const getUsers = async () => {
  let res = await axios.get(baseUrl);
  return res.data;
};

export default { getUsers };
