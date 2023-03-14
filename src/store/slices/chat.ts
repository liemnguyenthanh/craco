import { moveItemToFront } from '@/utils/helpers'
import { groupMessagesByTypeAndUser, mergeNewMessage } from '@/utils/logics/messages'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axiosRequest } from '@/services'
import { IChatInitial } from '@/utils/types/chats'
import { IMessage } from '@/utils/types/messages'
import { ICreateRoom, IRoom, IRoomMessageStatus } from '@/utils/types/rooms'
import { getSpecialMessage, SPECIAL_MESSAGE } from '../middleware/events'

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
      const message = action.payload
      
      // merge message in room list
      if (state.messagesInRooms && roomId in state.messagesInRooms) {
        mergeNewMessage(message, state.messagesInRooms[roomId])
      }
      //add last message in room list
      if (room) {
        room.last_message.message_id = message
        if (room._id !== state.roomInfo?._id) {
          room.unread_count++
        }
        moveItemToFront(state.roomList, room)
      }
      //check type = 2 and exist in special action 
      if (message.message_type === 2) {
        const { event, content } = getSpecialMessage(message.message_text)
        if (event in SPECIAL_MESSAGE) {
          if (event === SPECIAL_MESSAGE.CHANGED_NAME_ROOM) {
            if (state.roomInfo) state.roomInfo.chatroom_name = content
            if (room) room.chatroom_name = content
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomList.fulfilled, (state, action: PayloadAction<IRoom[]>) => {
      state.roomList = action.payload
    })
    builder.addCase(createRoom.fulfilled, (state, action: PayloadAction<IRoom>) => {
      if (action.payload) {
        action.payload.unread_count = 1
        state.roomList = [action.payload].concat(state.roomList)
      }
    })
    builder.addCase(fetchRoomInfo.fulfilled, (state, action: PayloadAction<IRoom>) => {
      state.roomInfo = action.payload
    })
    builder.addCase(updateReadMessageInRoom.fulfilled, (state, action: PayloadAction<IRoomMessageStatus>) => {
      const roomIndex = state.roomList.findIndex(room => room._id === action.payload.room_id)

      if (roomIndex > -1) {
        state.roomList[roomIndex].unread_count = 0
      }
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
  async (room: ICreateRoom, { rejectWithValue }) => {
    try {
      const response = await axiosRequest("/rooms", room)
      return response
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
)

export const updateReadMessageInRoom = createAsyncThunk(
  'rooms/readMessage',
  async (req: { room_id: string, user_id: string, count: number }, { rejectWithValue }) => {
    try {

      const response = await axiosRequest("/rooms/read-message", req)
      return response
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
)

export default chatSlice.reducer