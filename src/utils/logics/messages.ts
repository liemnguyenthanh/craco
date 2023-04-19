import { LIMIT_MESSAGE, MESSAGE_ROOM_INFO, MESSAGE_USER, TYPE_MESSAGE } from '@/constants/chats';
import { IMessagesInRoom } from '@/utils/types/chats';
import { v4 as generalId } from 'uuid';
import { getCurrentUser, last } from '../helpers';
import { ICreateMessage, IGroupMessageByType, IGroupMessageByUser, IMessage } from '../types/messages';
import { IRoom, IRoomMessageStatus } from '../types/rooms';
import { getDataChangedRoom } from './rooms';

const userInfo = getCurrentUser()

export const createRequestMessage = (room_id: string, message_text: string, message_type: TYPE_MESSAGE): ICreateMessage => ({
   sender_id: userInfo._id,
   room_id,
   message_text,
   message_type,
   timestamp: new Date().getTime()
})

export const createRequestReadMessage = (room_id: string, last_message_read_id?: string, unread_count?: number ) => {
   const payload: IRoomMessageStatus = { room_id, user_id: userInfo._id }
   
   if (last_message_read_id) payload.last_message_read_id = last_message_read_id
   if (unread_count && unread_count > -1) payload.unread_count = unread_count
   
   return payload
}

export const convertMessageRoomToText = (message: IMessage, roomInfo: IRoom): string => {
   const messageType = message.message_type;

   if (messageType in MESSAGE_USER) {
      return message.message_text;
   }

   if (messageType === MESSAGE_ROOM_INFO.CREATE_ROOM) {
      return 'Create Room';
   }

   const data = getDataChangedRoom(message);
   const sender = roomInfo.chatroom_participants.find((participant) => participant._id === message.sender_id);
   const senderName = message.sender_id === userInfo._id ? 'You' : sender?.username ?? '...';
   let senderAction = '';
   let senderResult = '';

   switch (messageType) {
      case MESSAGE_ROOM_INFO.CHANGE_ROOM_NAME:
         senderAction = 'changed room name';
         senderResult = data?.chatroom_name;
         break;

      case MESSAGE_ROOM_INFO.CHANGE_NICK_NAME:
         if (data) {
            for (const [userId, name] of Object.entries(data)) {
               const user = roomInfo.chatroom_participants.find((participant) => participant._id === userId);
               const userName = user?.username ?? '...';
               senderAction = `set nickname for ${userName}:`;
               senderResult = name;
            }
         }
         break;

      default:
         break;
   }

   return `${senderName} ${senderAction} ${senderResult}`;
}

const isPushItemToGroupList = (currentItem: IMessage, nextItem: IMessage): boolean => (
   currentItem.message_type in MESSAGE_ROOM_INFO ||
   !nextItem ||
   currentItem.message_type !== nextItem.message_type ||
   currentItem.sender_id !== nextItem.sender_id
)

export const groupMessagesByTypeAndUser = (messageList: IMessage[]): IGroupMessageByType[] => {
   const list = [...messageList]
   list.reverse()
   const infoUser = getCurrentUser()
   const groupList: IGroupMessageByType[] = []
   let groupByType: IGroupMessageByType = { key: null, type: MESSAGE_USER.MESSAGE_TEXT }
   let groupByUser: IGroupMessageByUser = { key: null, sender_id: '', isMe: false, messages: [] }

   for (let index = 0; index < list.length; index++) {
      const item = list[index];
      if (!groupByType.key) groupByType.key = generalId()
      groupByType.type = item.message_type

      if (item.message_type === MESSAGE_USER.MESSAGE_TEXT) {
         if (!groupByUser.key) groupByUser.key = generalId();

         groupByUser.sender_id = item.sender_id
         groupByUser.messages.push(item)
      }

      if (item.message_type in MESSAGE_ROOM_INFO) groupByType.action = item

      if (isPushItemToGroupList(item, list[index + 1])) {
         if (groupByUser.key) {
            if (infoUser && infoUser._id === groupByUser.sender_id)
               groupByUser.isMe = true
            groupByType.messages_user = groupByUser
         }
         groupList.push(groupByType)
         groupByType = { key: null, type: MESSAGE_USER.MESSAGE_TEXT }
         groupByUser = { key: null, sender_id: '', isMe: false, messages: [] }
      }
   }

   return groupList
}

export const mergeNewMessage = (message: IMessage, list: IGroupMessageByType[]): IGroupMessageByType[] => {
   const lastItem: IGroupMessageByType = last(list)
   const infoUser = getCurrentUser()

   if (message.message_type === MESSAGE_USER.MESSAGE_TEXT && lastItem.messages_user?.sender_id === message.sender_id) {
      lastItem.messages_user.messages.push(message)
      return list
   }
   const groupByType: IGroupMessageByType = { key: generalId(), type: message.message_type }

   if (groupByType.type === MESSAGE_USER.MESSAGE_TEXT) {
      const groupByUser: IGroupMessageByUser = {
         key: generalId(),
         isMe: !!(infoUser && infoUser._id === message.sender_id),
         sender_id: message.sender_id,
         messages: [message]
      }
      groupByType.messages_user = groupByUser
   }

   if (groupByType.type in MESSAGE_ROOM_INFO) groupByType.action = message
   list.push(groupByType)

   return list
}

export const mergeLoadMoreMessage = (messages: IMessage[], room: IMessagesInRoom, roomInfo: IRoom): IMessagesInRoom => {
   if (messages.length < LIMIT_MESSAGE) room.shouldLoadMore = false
   if (messages.length === 0) return room;

   room.firstMessage = last(messages)
   const newGroupByTypeAndUser: IGroupMessageByType[] = groupMessagesByTypeAndUser(messages)
   const lastNewItem = last(newGroupByTypeAndUser)
   const firstOldItem = room.list[0]

   if (lastNewItem.type in MESSAGE_ROOM_INFO ||
      firstOldItem.type in MESSAGE_ROOM_INFO ||
      lastNewItem.messages_user.sender_id !== firstOldItem.messages_user?.sender_id
   ) {
      room.list = newGroupByTypeAndUser.concat(room.list)
   } else {
      const copyMessage = [...messages.reverse()]
      for (let index = copyMessage.length - 1; 0 <= index; index--) {
         const element = copyMessage[index];

         if (element.message_type in MESSAGE_USER && element.sender_id === firstOldItem.messages_user?.sender_id) {
            firstOldItem.messages_user.messages.splice(0, 0, element)
            copyMessage.pop()
         } else break
      }
      copyMessage.reverse()
      room.list = groupMessagesByTypeAndUser(copyMessage).concat(room.list)
   }

   return room
}

export const createMessageInRoom = (messages: IMessage[]): IMessagesInRoom => ({
   shouldLoadMore: messages.length <= LIMIT_MESSAGE,
   list: groupMessagesByTypeAndUser(messages),
   firstMessage: last(messages)
})