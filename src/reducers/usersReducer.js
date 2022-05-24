import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

const initializeUsers = () => {
  return async (dispatch) => {
    let users = await userService.getUsers();
    dispatch(setUsers(users));
  };
};

const bindedActions = {
  initializeUsers,
};
export { bindedActions };

export default usersSlice.reducer;
