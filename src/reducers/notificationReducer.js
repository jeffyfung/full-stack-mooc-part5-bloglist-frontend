import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { message: null, error: null },
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
  },
});

export const { updateNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
