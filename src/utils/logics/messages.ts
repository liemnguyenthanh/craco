import { LIMIT_MESSAGE, MESSAGE_ROOM_INFO, MESSAGE_USER, TYPE_MESSAGE } from '@/constants/chats';
import { IMessagesInRoom } from '@/utils/types/chats';
import { v4 as generalId } from 'uuid';
import { getMyAccount, last } from '../helpers';
import { IGroupMessageByType, IGroupMessageByUser, IMessage } from '../types/messages';
import { IRoom } from '../types/rooms';
import { getDataChangedRoom } from './rooms';

const userInfo = getMyAccount()

export const createRequestMessage = (room_id: string, message_text: string, message_type: TYPE_MESSAGE): IMessage => {

   return {
      sender_id: userInfo._id,
      room_id,
      message_text,
      message_type,
      timestamp: new Date().getTime()
   }
}

// const createSender = (_id: string, roomInfo: IRoom): ISenderInRoom => {
//    const username = roomInfo && roomInfo.chatroom_participants.find(user => user._id === _id)?.username
//    const nickname = roomInfo?.nickname && roomInfo.nickname[_id]
//    return {
//       _id,
//       username: username ?? '',
//       nickname: nickname ?? '',
//       avatar: generalAvatar(_id),
//    }
// }
export const convertMessageRoomToText = (message: IMessage, roomInfo: IRoom): string => {
   const data = getDataChangedRoom(message)
   const user = roomInfo.chatroom_participants.find(item => item._id === message.sender_id)
   let sender_name: string = message.sender_id === userInfo._id ? 'You' : (user?.username ?? '...')
   let sender_action: string = ''
   let sender_result: string = ''

   if (message.message_type === MESSAGE_ROOM_INFO.CHANGE_ROOM_NAME) {
      sender_action = 'changed room name'
      sender_result = data.chatroom_name
   }

   if (message.message_type === MESSAGE_ROOM_INFO.CHANGE_NICK_NAME) {
      for (const [user_id, name] of Object.entries(data)) {
         const user_set = roomInfo.chatroom_participants.find(item => item._id === user_id)
         sender_action = `set ${user_set?.username}:`
         sender_result = name
      }
   }
 
   let text = `${sender_name} ${sender_action}: ${sender_result}`
   return text;
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
   const infoUser = getMyAccount()
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
   const infoUser = getMyAccount()

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