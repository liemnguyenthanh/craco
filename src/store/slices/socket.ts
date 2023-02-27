import { createSlice } from '@reduxjs/toolkit';
import { SocketInitial } from '../../utils/types/socket';

const initialState: SocketInitial = {
  isConnected: false,
  usersOnline: null,
  notification: null,
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connect(state) {
      state.isConnected = true;
    },
    disconnect(state) {
      state.isConnected = false;
    },
    setUsersOnline(state, action) {
      state.usersOnline = action.payload;
    },
    addUsersOnline(state, action) {
      if (state.usersOnline?.some(user => user.username === action.payload.username)) return;
      state.usersOnline?.push(action.payload);
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setUsersOnline, setNotification, addUsersOnline } = socketSlice.actions

export default socketSlice.reducer;
