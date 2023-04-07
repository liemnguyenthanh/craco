import { MESSAGE_ROOM_INFO } from '@/constants/chats';
import { axiosRequest } from '@/services';
import { getMyAccount, moveItemToFront } from '@/utils/helpers';
import { createMessageInRoom, createRequestMessage, mergeLoadMoreMessage, mergeNewMessage } from '@/utils/logics/messages';
import { convertCommonRoom, getDataChangedRoom } from '@/utils/logics/rooms';
import { showNotification } from '@/utils/notification';
import { IChatInitial } from '@/utils/types/chats';
import { IMessage } from '@/utils/types/messages';
import { ICreateRoom, IRoom, IRoomMessageStatus, IUpdateRoom } from '@/utils/types/rooms';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { EVENTS_SOCKET } from '../middleware/events';

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
         const roomLeft = state.roomList.find(item => item._id === roomId);
         const roomRight = state.roomInfoList[roomId]
         const messagesList = state.messagesInRooms[roomId]
         const newMessage = action.payload;

         // merge message in room - right screen
         if (messagesList) mergeNewMessage(newMessage, messagesList.list)

         //add last message in room list - left screen
         if (roomLeft) {
            if (roomLeft._id !== state.roomIdActive) {
               roomLeft.unread_count++;
               if (roomRight) roomRight.unread_count++;
            }

            roomLeft.last_message.message_id = newMessage;
            moveItemToFront(state.roomList, roomLeft);
         } else {
            // please handle add room when new message from user does not inside room list
            // join vào room list
            state.newMessageNoRoom = newMessage;
         }

         //check type = admin and exist in special action -- all screen
         if (newMessage.message_type === MESSAGE_ROOM_INFO.CHANGE_ROOM_NAME) {
            const { chatroom_name } = getDataChangedRoom(newMessage)

            if (chatroom_name) {
               if (roomRight) roomRight.chatroom_name = chatroom_name;
               if (roomLeft) roomLeft.chatroom_name = chatroom_name;
            }
         }

         if (newMessage.message_type === MESSAGE_ROOM_INFO.CHANGE_NICK_NAME) {
            if (roomRight) {
               const data = getDataChangedRoom(newMessage)

               for (const [user_id, name] of Object.entries(data)) {
                  roomRight.nickname[user_id] = name

                  if (roomLeft) roomLeft.nickname[user_id] = name
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
      //fetchRoomInfo
      builder.addCase(fetchRoomInfo.pending, (state) => {
         state.isLoadingRoom = true;
      });
      builder.addCase(fetchRoomInfo.fulfilled, (state, action: PayloadAction<IRoom>) => {
         state.roomInfo = action.payload;
         state.isLoadingRoom = false;
         state.notFoundRoom = false;
         const roomId = action.payload._id;

         if (!(roomId in state.roomInfoList)) {
            state.roomInfoList[roomId] = convertCommonRoom(action.payload);
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

         const newMessages = createMessageInRoom(action.payload);
         state.messagesInRooms[state.roomIdActive] = newMessages;
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
            const roomInfo = state.roomInfoList[roomId]
            // merge message zo room list
            mergeLoadMoreMessage(action.payload, state.messagesInRooms[roomId], roomInfo);
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
         let typeMessage = MESSAGE_ROOM_INFO.CHANGE_ROOM_NAME
         if (response) {
            let message = ''

            if (update.nickname) {
               message = JSON.stringify(update.nickname)
               typeMessage = MESSAGE_ROOM_INFO.CHANGE_NICK_NAME
            }

            if (update.chatroom_name) {
               message = JSON.stringify(update)
            }

            const requestMessage = createRequestMessage(response.room_id, message, typeMessage)

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
            const requestMessage = createRequestMessage(response.room._id, 'CREATE_ROOM', MESSAGE_ROOM_INFO.CREATE_ROOM)
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