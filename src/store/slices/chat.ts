import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axiosRequest } from '../../services'
import { IChatInitial } from '../../utils/types/chats'
import { IMessage } from '../../utils/types/messages'


const initialState: IChatInitial = {
  roomList: [],
  roomInfo: null,
  messagesList: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    receiveNewMessage(state, action: PayloadAction<IMessage>) {
      state.messagesList = [action.payload].concat(state.messagesList)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomList.fulfilled, (state, action: PayloadAction<any>) => {
      state.roomList = action.payload
    })
    builder.addCase(fetchRoomInfo.fulfilled, (state, action: PayloadAction<any>) => {
      state.roomInfo = action.payload
    })
    builder.addCase(fetchMessageList.fulfilled, (state, action: PayloadAction<any>) => {
      state.messagesList = action.payload
    })
  },
})

export const { receiveNewMessage } = chatSlice.actions

export const fetchMessageList = createAsyncThunk(
  'messages/list',
  async (room_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest("/messages?room_id=" + room_id)
      return response
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
)

export const fetchRoomList = createAsyncThunk(
  'chatroom/list',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest("/chatrooms?user_id=" + userId,)
      return response
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
)

export const fetchRoomInfo = createAsyncThunk(
  'chatroom/info',
  async (room_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest("/chatrooms/" + room_id,)
      return response
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
)

export default chatSlice.reducer
