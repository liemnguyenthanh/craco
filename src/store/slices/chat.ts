import { TYPE_MESSAGE } from '@/constants/chats';
import { axiosRequest } from '@/services';
import { getMyAccount, moveItemToFront } from '@/utils/helpers';
import { createMessageInRoom, createRequestMessage, mergeLoadMoreMessage, mergeNewMessage } from '@/utils/logics/messages';
import { convertCommonRoom } from '@/utils/logics/rooms';
import { showNotification } from '@/utils/notification';
import { IChatInitial } from '@/utils/types/chats';
import { IMessage } from '@/utils/types/messages';
import { ICreateRoom, IRoom, IRoomMessageStatus, IUpdateRoom } from '@/utils/types/rooms';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { EVENTS_SOCKET, getSpecialMessage, SPECIAL_MESSAGE } from '../middleware/events';

const initialState: IChatInitial = {
   roomInfo: null,
   roomList: [],
   roomInfoList: {},
   notFoundRoom: false,
   isLoadingRoom: false,

   roomIdActive: '',
   messagesList: [],
   messagesInRooms: {},
   isLoadingMessageRoom: false,
   isLoadMoreMessageRoom: false,

   newMessageNoRoom: null,
};

const userInfo = getMyAccount();

export const chatSlice = createSlice({
   name: 'chat',
   initialState,
   reducers: {
      receiveNewMessage(state, action: PayloadAction<IMessage>) {
         const roomId: string = action.payload.room_id;
         const room = state.roomList.find(item => item._id === roomId);
         const message = action.payload;

         // merge message in room list
         if (roomId in state.messagesInRooms) {
            mergeNewMessage(message, state.messagesInRooms[roomId].list);
         }

         //add last message in room list
         if (room) {
            room.last_message.message_id = message;
            if (room._id !== state.roomIdActive) {
               room.unread_count++;
               //update room in roomInfoList
               if (roomId in state.roomInfoList) {
                  state.roomInfoList[roomId].unread_count++;
               }
            }
            moveItemToFront(state.roomList, room);
         } else {
            // please handle add room when new message from user does not inside room list
            // join vào room list
            state.newMessageNoRoom = message;
         }

         //check type = admin and exist in special action 
         if (message.message_type === TYPE_MESSAGE.ADMIN) {
            const { event, content } = getSpecialMessage(message.message_text);
            if (event in SPECIAL_MESSAGE) {
               if (event === SPECIAL_MESSAGE.CHANGED_NAME_ROOM) {
                  if (state.roomInfoList[message.room_id]) state.roomInfoList[message.room_id].chatroom_name = content;
                  if (room) room.chatroom_name = content;
               }
            }
         }
      },
      setRoomIdActive(state, action: PayloadAction<string>) {
         state.roomIdActive = action.payload;
      },
      clearNewMessageNoRoom(state) {
         state.newMessageNoRoom = null;
      },
   },
   extraReducers: (builder) => {
      //fetchRoomList
      builder.addCase(fetchRoomList.fulfilled, (state, action: PayloadAction<IRoom[]>) => {
         state.roomList = action.payload.map(room => convertCommonRoom(room));
      });
      //createRoom
      builder.addCase(createRoom.fulfilled, (state, action: PayloadAction<IRoom>) => {
         if (action.payload) {
            // action.payload.unread_count = 1;
            // state.roomList = [action.payload].concat(state.roomList);
         }
      });
      //fetchRoomInfo
      builder.addCase(fetchRoomInfo.pending, (state) => {
         state.isLoadingRoom = true;
      });
      builder.addCase(fetchRoomInfo.fulfilled, (state, action: PayloadAction<IRoom>) => {
         state.roomInfo = action.payload;
         state.isLoadingRoom = false;
         state.notFoundRoom = false;
         const newRoomId = action.payload._id;
         if (!(newRoomId in state.roomInfoList)) {
            state.roomInfoList[newRoomId] = action.payload;
         }
      });
      builder.addCase(fetchRoomInfo.rejected, (state) => {
         state.isLoadingRoom = false;
         state.notFoundRoom = true;
      });
      //updateReadMessageInRoom
      builder.addCase(updateReadMessageInRoom.fulfilled, (state, action: PayloadAction<IRoomMessageStatus>) => {
         const room_id = action.payload.room_id;
         const roomIndex = state.roomList.findIndex(room => room._id === room_id);

         if (roomIndex > -1) {
            state.roomList[roomIndex].unread_count = 0;
         }
         if (room_id in state.roomInfoList) {
            state.roomInfoList[room_id].unread_count = 0;
         }
      });
      //fetchMessageList
      builder.addCase(fetchMessageList.pending, (state) => {
         state.isLoadingMessageRoom = true;
      });
      builder.addCase(fetchMessageList.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
         state.isLoadingMessageRoom = false;
         if (!action.payload || !state.roomIdActive) return;
         const newRoom = createMessageInRoom(action.payload);
         state.messagesInRooms[state.roomIdActive] = newRoom;
      });
      //fetchLoadMoreMessageList
      builder.addCase(fetchLoadMoreMessageList.pending, (state) => {
         state.isLoadMoreMessageRoom = true;
      });
      builder.addCase(fetchLoadMoreMessageList.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
         state.isLoadMoreMessageRoom = false;
         if (!action.payload || !state.roomIdActive) return;
         const roomId: string = state.roomIdActive;
         if (roomId in state.messagesInRooms) {
            // merge message zo room list
            mergeLoadMoreMessage(action.payload, state.messagesInRooms[roomId]);
         }
      });
      //fetchRoomNotExist
      builder.addCase(fetchRoomNotExist.fulfilled, (state, action: PayloadAction<IRoom>) => {
         const room = convertCommonRoom(action.payload);

         if (room) state.roomList.splice(0, 0, room)
      });
   },
});

export const { receiveNewMessage, setRoomIdActive, clearNewMessageNoRoom } = chatSlice.actions;

export const fetchMessageList = createAsyncThunk(
   'messages/list',
   async (request: any, { rejectWithValue }) => {
      try {
         const params = new URLSearchParams(request).toString();
         const response = await axiosRequest('/messages?' + params);
         return response;
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   },
);

export const fetchLoadMoreMessageList = createAsyncThunk(
   'messages/loadmore',
   async (request: any, { rejectWithValue }) => {
      try {
         const params = new URLSearchParams(request).toString();
         const response = await axiosRequest('/messages?' + params);
         return response;
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   },
);

export const fetchRoomList = createAsyncThunk(
   'rooms/list',
   async (userId: string, { rejectWithValue }) => {
      try {
         const response = await axiosRequest('/rooms?user_id=' + userId);
         return response;
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   },
);

export const fetchRoomInfo = createAsyncThunk(
   'rooms/info',
   async (request: { room_id: string, user_id: string }, { rejectWithValue }) => {
      try {
         const response = await axiosRequest(`/rooms/info?room_id=${request.room_id}&user_id=${request.user_id}`);
         return response;
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   },
);

export const updateRoomInfo = createAsyncThunk(
   'rooms/info/update',
   async (update: IUpdateRoom, { rejectWithValue, getState, dispatch }) => {
      try {
         const state = getState() as RootState
         const { roomIdActive } = state.chat
         const response = await axiosRequest(`/rooms/update/${roomIdActive}`, update);
         if (response) {
            console.log(response);
            // username + set username nickname to response 
            let message = `${userInfo.username} set nickname: `

            if (update.nickname) {
               //    const room = roomInfoList[roomIdActive]
               //    const userNickname = room.chatroom_participants.find(item => item._id === response.nickname)
               Object.keys(update.nickname).forEach((key) => {
                  if (update.nickname && key in update.nickname) {
                     message += update.nickname[key]
                  }
               })
            }
            const requestMessage = createRequestMessage(response.room_id, message, TYPE_MESSAGE.ADMIN)
            dispatch({ type: EVENTS_SOCKET.SEND_MESSAGE, payload: requestMessage })
         }

         return response;
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   },
);

export const fetchRoomNotExist = createAsyncThunk(
   'rooms/newMessage',
   async (request: { room_id: string, user_id: string }, { rejectWithValue }) => {
      try {
         const response = await axiosRequest(`/rooms/info?room_id=${request.room_id}&user_id=${request.user_id}`);
         return response;
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   },
);

export const createRoom = createAsyncThunk(
   'rooms/create',
   async (room: ICreateRoom, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosRequest('/rooms', room);
         if (!response.is_room_exist) {
            showNotification('Tạo phòng rồi ra nhắn tin đê!!')
            const requestMessage = createRequestMessage(response.room._id, 'CREATE_ROOM', TYPE_MESSAGE.ADMIN)
            dispatch({ type: EVENTS_SOCKET.SEND_MESSAGE, payload: requestMessage })
         }
         return response;
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   },
);

export const updateReadMessageInRoom = createAsyncThunk(
   'rooms/readMessage',
   async (req: { room_id: string, count: number }, { rejectWithValue }) => {
      try {
         const response = await axiosRequest('/rooms/read-message', { ...req, user_id: userInfo._id });
         return response;
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   },
);

export default chatSlice.reducer;