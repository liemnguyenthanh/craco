import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axiosRequest } from '../../services'
import { groupMessagesByTypeAndUser, mergeNewMessage, moveItemToFront } from '../../utils/helpers'
import { IChatInitial } from '../../utils/types/chats'
import { IMessage } from '../../utils/types/messages'
import { ICreateChatRoom } from '../../utils/types/rooms'

const initialState: IChatInitial = {
  roomList: [],
  roomInfo: null,
  messagesList: [],
  messagesInRooms: null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    receiveNewMessage(state, action: PayloadAction<IMessage>) {
      const roomId: string = action.payload.room_id
      const room = state.roomList.find(item => item._id === roomId)
      // merge message in room list
      if (state.messagesInRooms && roomId in state.messagesInRooms) {
        mergeNewMessage(action.payload, state.messagesInRooms[roomId])
      }
      //add last message in room list
      if (room) {
        room.last_message.message_id = action.payload
        moveItemToFront(state.roomList, room)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomList.fulfilled, (state, action: PayloadAction<any>) => {
      state.roomList = action.payload
    }) 
    builder.addCase(createRoom.fulfilled, (state, action: PayloadAction<any>) => {
      console.log({action});
      // state.roomList = action.payload
    })
    builder.addCase(fetchRoomInfo.fulfilled, (state, action: PayloadAction<any>) => {
      state.roomInfo = action.payload
    })
    builder.addCase(fetchMessageList.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
      if (!action.payload.length) return;
      const roomId: string = action.payload[0].room_id
      if (state.messagesInRooms && roomId in state.messagesInRooms) {
        // merge message zo room list
      } else {
        state.messagesInRooms = {}
        state.messagesInRooms[roomId] = groupMessagesByTypeAndUser(action.payload)
      }
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
  'rooms/list',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest("/rooms?user_id=" + userId,)
      return response
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
)

export const fetchRoomInfo = createAsyncThunk(
  'rooms/info',
  async (room_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest("/rooms/" + room_id,)
      return response
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
)

export const createRoom = createAsyncThunk(
  'rooms/create',
  async (room: ICreateChatRoom, { rejectWithValue }) => {
    try {
      console.log("zo");
      const response = await axiosRequest("/rooms", room)
      return response
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
)

export default chatSlice.reducer
