import { MESSAGE_ROOM_INFO } from '@/constants/chats';
import { axiosRequest } from '@/services';
import { getCurrentUser } from '@/utils/helpers';
import { updateUnReadMessage, handleSpecialMessage, mergeNewMessageInRoom, updateRoomLeft, updateRoomRight } from '@/utils/logics/chats';
import { createMessageInRoom, createRequestMessage, mergeLoadMoreMessage } from '@/utils/logics/messages';
import { convertCommonRoom, handleReadMessage } from '@/utils/logics/rooms';
import { showNotification } from '@/utils/notification';
import { IChatInitial } from '@/utils/types/chats';
import { IMessage } from '@/utils/types/messages';
import { ICreateRoom, IRoom, IRoomMessageStatus, IUpdateRoom } from '@/utils/types/rooms';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  newMessage: null,
};

const userInfo = getCurrentUser();

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    receiveNewMessage(state, action: PayloadAction<IMessage>) {
      const newMessage = action.payload;

      mergeNewMessageInRoom(newMessage, state.messagesInRooms[newMessage.room_id]);
      updateRoomLeft(newMessage, state);
      updateRoomRight(newMessage, state);
      updateUnReadMessage(newMessage, state);
      handleSpecialMessage(newMessage, state);

    },
    updateRoomHasNewMessage(state, action: PayloadAction<{ room_id: string, isBottomScroll: boolean }>) {
      const { room_id, isBottomScroll } = action.payload
      const roomRight = state.roomInfoList[room_id];
      const roomLeft = state.roomList.find((item) => item._id === room_id);

      if (isBottomScroll) {
        roomRight.unread_count = 0
        if (roomLeft) roomLeft.unread_count = 0
      } else {
        roomRight.unread_count++
        if (roomLeft) roomLeft.unread_count++
      }
    },
    setRoomIdActive(state, action: PayloadAction<string>) {
      state.roomIdActive = action.payload;
    },
    clearNewMessageNoRoom(state) {
      state.newMessageNoRoom = null;
    },
    clearNewMessage(state) {
      state.newMessage = null
    },
    readMessage(state, action: PayloadAction<IRoomMessageStatus>) {
      const { last_message_read_id, user_id, room_id } = action.payload
      // FIX ME: this code is not work
      const roomRight = state.roomInfoList[room_id]
      const roomLeft = state.roomList.find((item) => item._id === room_id);

      if (user_id === userInfo._id) {
        if (roomLeft) roomLeft.unread_count = 0
        roomRight.unread_count = 0
      }

      if (!last_message_read_id || !roomRight) return;
      handleReadMessage(user_id, last_message_read_id, roomRight.last_messages_seen_by)
    }
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
    //updateUnReadMessageInRoom
    builder.addCase(updateUnReadMessageInRoom.fulfilled, (state, action: PayloadAction<IRoomMessageStatus>) => {
      const room_id = action.payload.room_id;
      const roomLeft = state.roomList.find(room => room._id === room_id);
      const roomRight = state.roomInfoList[room_id]

      if (roomLeft) {
        roomLeft.unread_count = 0;
      }

      if (roomRight) {
        roomRight.unread_count = 0;
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

export const { receiveNewMessage, setRoomIdActive, clearNewMessageNoRoom, clearNewMessage, readMessage, updateRoomHasNewMessage } = chatSlice.actions;


export const getRoomInfoActive = (state: RootState) => state.chat.roomInfoList[state.chat.roomIdActive]

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

export const updateUnReadMessageInRoom = createAsyncThunk(
  'rooms/readMessage',
  async (req: { room_id: string, last_message_read_id?: string, unread_count: number }, { rejectWithValue }) => {
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