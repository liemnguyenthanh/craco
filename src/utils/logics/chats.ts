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

export function updateRoomLeft(newMessage: IMessage, state: IChatInitial) {
  const roomId = newMessage.room_id;
  const roomLeft = state.roomList.find((item) => item._id === roomId);

  if (roomLeft) {
    if (roomLeft.last_message) {
      roomLeft.last_message.message_id = newMessage;
    }
    moveItemToFront(state.roomList, roomLeft);
  } else {
    state.newMessageNoRoom = newMessage;
  }
}

export function updateRoomRight(newMessage: IMessage, state: IChatInitial) {
  const roomId = newMessage.room_id;
  const roomRight = state.roomInfoList[roomId];

  if (roomRight) {
    if (roomRight.last_message) {
      roomRight.last_message.message_id = newMessage;
    }
  }
}

export function updateUnReadMessage(newMessage: IMessage, state: IChatInitial) {
  const roomId = newMessage.room_id;

  if (!state.roomIdActive) return;

  if (state.roomIdActive !== roomId) {
    const roomRight = state.roomInfoList[roomId];
    const roomLeft = state.roomList.find((item) => item._id === roomId);

    if (roomRight) roomRight.unread_count++;
    if (roomLeft) roomLeft.unread_count++;

    return;
  }

  if (newMessage.sender_id === userInfo._id) return;
  state.newMessage = newMessage
}

export function handleSpecialMessage(newMessage: IMessage, state: IChatInitial) {
  const roomId = newMessage.room_id;
  const roomLeft = state.roomList.find((item) => item._id === roomId);
  const roomRight = state.roomInfoList[roomId];

  if (newMessage.message_type === MESSAGE_ROOM_INFO.CHANGE_ROOM_NAME) {
    const { chatroom_name } = getDataChangedRoom(newMessage);

    if (chatroom_name) {
      if (roomRight) {
        roomRight.chatroom_name = chatroom_name;
      }
      if (roomLeft) {
        roomLeft.chatroom_name = chatroom_name;
      }
    }
  }

  if (newMessage.message_type === MESSAGE_ROOM_INFO.CHANGE_NICK_NAME) {
    if (roomRight) {
      const data = getDataChangedRoom(newMessage);

      for (const [user_id, name] of Object.entries(data)) {
        roomRight.nickname[user_id] = name;

        if (roomLeft) {
          roomLeft.nickname[user_id] = name;
        }
      }
    }
  }
}
