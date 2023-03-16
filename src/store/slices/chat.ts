import { TYPE_MESSAGE } from '@/constants/chats'
import { axiosRequest } from '@/services'
import { moveItemToFront } from '@/utils/helpers'
import { mergeNewMessage, createMessageInRoom, mergeLoadMoreMessage } from '@/utils/logics/messages'
import { IChatInitial } from '@/utils/types/chats'
import { IMessage } from '@/utils/types/messages'
import { ICreateRoom, IRoom, IRoomMessageStatus } from '@/utils/types/rooms'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getSpecialMessage, SPECIAL_MESSAGE } from '../middleware/events'

const initialState: IChatInitial = {
   roomList: [],
   roomInfo: null,
   roomInfoList: {},
   notFoundRoom: false,
   isLoadingRoom: false,
   messagesList: [],
   isLoadingMessageRoom: false,
   isLoadMoreMessageRoom: false,
   messagesInRooms: {}
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
         if (roomId in state.messagesInRooms) {
            mergeNewMessage(message, state.messagesInRooms[roomId].list)
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
         if (message.message_type === TYPE_MESSAGE.ADMIN) {
            const { event, content } = getSpecialMessage(message.message_text)
            if (event in SPECIAL_MESSAGE) {
               if (event === SPECIAL_MESSAGE.CHANGED_NAME_ROOM) {
                  if (state.roomInfo) state.roomInfo.chatroom_name = content
                  if (room) room.chatroom_name = content
               }
            }
         }
      },
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
      builder.addCase(fetchRoomInfo.pending, (state) => {
         state.isLoadingRoom = true
      })
      builder.addCase(fetchRoomInfo.fulfilled, (state, action: PayloadAction<IRoom>) => {
         state.roomInfo = action.payload
         state.isLoadingRoom = false
         const newRoomId = action.payload._id
         state.notFoundRoom = false
         if (!(newRoomId in state.roomInfoList)) {
            state.roomInfoList[newRoomId] = action.payload
         }
      })
      builder.addCase(fetchRoomInfo.rejected, (state, action: PayloadAction<any>) => {
         state.isLoadingRoom = false
         state.notFoundRoom = true
      })
      builder.addCase(updateReadMessageInRoom.fulfilled, (state, action: PayloadAction<IRoomMessageStatus>) => {
         const roomIndex = state.roomList.findIndex(room => room._id === action.payload.room_id)

         if (roomIndex > -1) {
            state.roomList[roomIndex].unread_count = 0
         }
      })
      builder.addCase(fetchMessageList.pending, (state) => {
         state.isLoadingMessageRoom = true
      })
      builder.addCase(fetchMessageList.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
         state.isLoadingMessageRoom = false
         if (!action.payload || !state.roomInfo) return;
         const roomId: string = state.roomInfo._id
         const newRoom = createMessageInRoom(action.payload)
         state.messagesInRooms[roomId] = newRoom
      })

      builder.addCase(fetchLoadMoreMessageList.pending, (state) => {
         state.isLoadMoreMessageRoom = true
      })
      builder.addCase(fetchLoadMoreMessageList.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
         state.isLoadMoreMessageRoom = false
         if (!action.payload || !state.roomInfo) return;
         const roomId: string = state.roomInfo._id
         if (roomId in state.messagesInRooms) {
            // merge message zo room list
            mergeLoadMoreMessage(action.payload, state.messagesInRooms[roomId])
         }
      })
   },
})

export const { receiveNewMessage } = chatSlice.actions

export const fetchMessageList = createAsyncThunk(
   'messages/list',
   async (request: any, { rejectWithValue }) => {
      try {
         const params = new URLSearchParams(request).toString();
         const response = await axiosRequest("/messages?" + params)
         return response
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   }
)

export const fetchLoadMoreMessageList = createAsyncThunk(
   'messages/loadmore',
   async (request: any, { rejectWithValue }) => {
      try {
         const params = new URLSearchParams(request).toString();
         const response = await axiosRequest("/messages?" + params)
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