import { showNotification } from '@/utils/notification';
import { SocketInitial } from '@/utils/types/socket';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SocketInitial = {
   isConnected: false,
   usersOnline: null,
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
      //users
      setUsersOnline(state, action) {
         state.usersOnline = action.payload;
      },
      addUsersOnline(state, action) {
         if (state.usersOnline?.some(user => user.username === action.payload.username)) return;
         state.usersOnline?.push(action.payload);
      },
      removeUsersOnline(state, action: PayloadAction<{ socketId: string }>) {
         if (!state.usersOnline) return;
         const index = state.usersOnline.findIndex((user) => user.socketId === action.payload.socketId);
         if (index > -1) {
            showNotification('Khứa này mới offline ' + state.usersOnline[index].username)
            state.usersOnline.splice(index, 1);
         }
      },
   },
});

export const { setUsersOnline, addUsersOnline, removeUsersOnline } = socketSlice.actions

export default socketSlice.reducer;
