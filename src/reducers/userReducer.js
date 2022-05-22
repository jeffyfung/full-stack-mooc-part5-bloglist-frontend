import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

const initializeUser = (user) => {
  // user can fabricate a cookie with any token value; they will be able to see the displayed blogs
  return (dispatch) => {
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

const clearUserInfo = () => {
  return (dispatch) => {
    blogService.setToken('');
    dispatch(clearUser());
  };
};

const bindedActions = {
  initializeUser,
  clearUserInfo,
};
export { bindedActions };

export default userSlice.reducer;
