import { LIMIT_MESSAGE, TYPE_MESSAGE } from '@/constants/chats';
import { v4 as generalId } from 'uuid';
import { getMyAccount, last } from '../helpers';
import { IGroupMessageByType, IGroupMessageByUser, IMessage } from '../types/messages';
import { IMessagesInRoom } from '@/utils/types/chats'
const isPushItemToGroupList = (currentItem: IMessage, nextItem: IMessage): boolean => (
   currentItem.message_type === TYPE_MESSAGE.ADMIN ||
   !nextItem ||
   currentItem.message_type !== nextItem.message_type ||
   currentItem.sender_id !== nextItem.sender_id
)

export const groupMessagesByTypeAndUser = (messageList: IMessage[]): IGroupMessageByType[] => {
   const list = [...messageList]
   list.reverse()
   const infoUser = getMyAccount()
   const groupList: IGroupMessageByType[] = []
   let groupByType: IGroupMessageByType = { key: null, type: TYPE_MESSAGE.CLIENT }
   let groupByUser: IGroupMessageByUser = { key: null, sender: null, isMe: false, messages: [] }

   for (let index = 0; index < list.length; index++) {
      const item = list[index];
      if (!groupByType.key) groupByType.key = generalId()
      groupByType.type = item.message_type

      if (item.message_type === TYPE_MESSAGE.CLIENT) {
         if (!groupByUser.key) groupByUser.key = generalId();
         groupByUser.sender = { _id: item.sender_id, username: "User" + item.sender_id }
         groupByUser.messages.push(item)
      }

      if (item.message_type === TYPE_MESSAGE.ADMIN) groupByType.action = item

      if (isPushItemToGroupList(item, list[index + 1])) {
         if (groupByUser.key) {
            if (infoUser && infoUser._id === groupByUser.sender?._id)
               groupByUser.isMe = true
            groupByType.messages_user = groupByUser
         }
         groupList.push(groupByType)
         groupByType = { key: null, type: TYPE_MESSAGE.CLIENT }
         groupByUser = { key: null, sender: null, isMe: false, messages: [] }
      }
   }

   return groupList
}

export const mergeNewMessage = (message: IMessage, list: IGroupMessageByType[]): IGroupMessageByType[] => {
   const lastItem: IGroupMessageByType = last(list)
   const infoUser = getMyAccount()

   if (message.message_type === TYPE_MESSAGE.CLIENT && lastItem.messages_user?.sender?._id === message.sender_id) {
      lastItem.messages_user.messages.push(message)
      return list
   }
   const groupByType: IGroupMessageByType = { key: generalId(), type: message.message_type }

   if (groupByType.type === TYPE_MESSAGE.CLIENT) {
      const groupByUser: IGroupMessageByUser = {
         key: generalId(),
         isMe: !!(infoUser && infoUser._id === message.sender_id),
         sender: {
            _id: message.sender_id,
            username: "User" + message.sender_id
         },
         messages: [message]
      }
      groupByType.messages_user = groupByUser
   }

   if (groupByType.type === TYPE_MESSAGE.ADMIN) groupByType.action = message
   list.push(groupByType)

   return list
}

export const mergeLoadMoreMessage = (messages: IMessage[], room: IMessagesInRoom): IMessagesInRoom => {
   if (messages.length < LIMIT_MESSAGE) room.shouldLoadMore = false
   if (messages.length === 0) return room;

   room.firstMessage = last(messages)
   const newGroupByTypeAndUser: IGroupMessageByType[] = groupMessagesByTypeAndUser(messages)
   messages.reverse()
   const lastNewItem = last(newGroupByTypeAndUser)
   const firstOldItem = room.list[0]

   if (lastNewItem.type === TYPE_MESSAGE.ADMIN ||
      firstOldItem.type === TYPE_MESSAGE.ADMIN ||
      lastNewItem.messages_user.sender._id !== firstOldItem.messages_user?.sender?._id
   ) {
      room.list = newGroupByTypeAndUser.concat(room.list)
   } else {
      const copyMessage = [...messages]

      for (let index = copyMessage.length - 1; 0 <= index; index--) {
         const element = copyMessage[index];
         if (element.message_type === TYPE_MESSAGE.CLIENT && element.sender_id === firstOldItem.messages_user?.sender?._id) {
            firstOldItem.messages_user.messages.splice(1, 0, element)
            copyMessage.pop()
         } else break
      }
      room.list = groupMessagesByTypeAndUser(copyMessage).concat(room.list)
   }

   return room
}

export const createMessageInRoom = (messages: IMessage[]): IMessagesInRoom => ({
   shouldLoadMore: messages.length <= LIMIT_MESSAGE,
   list: groupMessagesByTypeAndUser(messages),
   firstMessage: last(messages)
})