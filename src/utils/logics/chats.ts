import { MESSAGE_ROOM_INFO } from "@/constants/chats";
import { getCurrentUser, moveItemToFront } from "../helpers";
import { IChatInitial, IMessagesInRoom } from "../types/chats";
import { IMessage } from "../types/messages";
import { mergeNewMessage } from "./messages";
import { getDataChangedRoom } from "./rooms";

const userInfo = getCurrentUser()

export function mergeNewMessageInRoom(newMessage: IMessage, messagesList: IMessagesInRoom) {
   if (messagesList) {
      mergeNewMessage(newMessage, messagesList.list);
   }
}

export function updateRoomCommon(newMessage: IMessage, state: IChatInitial) {
   const roomId = newMessage.room_id;
   const room = state.roomsCommon[roomId]

   if (room) {
      if (room.last_message) {
         room.last_message.message_id = newMessage;
      }
      moveItemToFront(state.roomList, roomId);
   } else {
      state.newMessageNoRoom = newMessage;
   }
}

export function updateUnReadMessage(newMessage: IMessage, state: IChatInitial) {
   const roomId = newMessage.room_id;
   const room = state.roomsCommon[roomId]

   if (room && state.roomIdActive !== roomId) {
      room.unread_count++;
      return;
   }

   if (newMessage.sender_id === userInfo._id) return;

   state.newMessage = newMessage
}

export function handleSpecialMessage(newMessage: IMessage, state: IChatInitial) {
   const roomId = newMessage.room_id;
   const room = state.roomsCommon[roomId];

   if (!room) return;

   if (newMessage.message_type === MESSAGE_ROOM_INFO.CHANGE_ROOM_NAME) {
      const { chatroom_name } = getDataChangedRoom(newMessage);

      if (chatroom_name) {
         room.chatroom_name = chatroom_name;
      }
   }

   if (newMessage.message_type === MESSAGE_ROOM_INFO.CHANGE_NICK_NAME) {
      const data = getDataChangedRoom(newMessage);

      for (const [user_id, name] of Object.entries(data)) {
         room.nickname[user_id] = name;
      }
   }
}
