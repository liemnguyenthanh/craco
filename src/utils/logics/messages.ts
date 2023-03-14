import { v4 as generalId } from 'uuid';
import { getMyAccount, last } from '../helpers';
import { IGroupMessageByType, IGroupMessageByUser, IMessage } from '../types/messages';

const isPushItemToGroupList = (currentItem: IMessage, nextItem: IMessage): boolean => {
   return currentItem.message_type === 2 ||
      !nextItem ||
      currentItem.message_type !== nextItem.message_type ||
      currentItem.sender_id !== nextItem.sender_id;
}

export const groupMessagesByTypeAndUser = (messageList: IMessage[]): IGroupMessageByType[] => {
   const list = [...messageList]
   list.reverse()
   const groupList: IGroupMessageByType[] = []
   let groupByType: IGroupMessageByType = { key: null, type: 1 }
   let groupByUser: IGroupMessageByUser = { key: null, sender: null, isMe: false, messages: [] }
   const infoUser = getMyAccount()

   for (let index = 0; index < list.length; index++) {
      const item = list[index];
      if (!groupByType.key) groupByType.key = generalId()
      groupByType.type = item.message_type

      if (item.message_type === 1) {
         if (!groupByUser.key) groupByUser.key = generalId();
         groupByUser.sender = { _id: item.sender_id, username: "User" + item.sender_id }
         groupByUser.messages.push(item)
      }

      if (item.message_type === 2) groupByType.action = item

      if (isPushItemToGroupList(item, list[index + 1])) {
         if (groupByUser.key) {
            if (infoUser && infoUser._id === groupByUser.sender?._id)
               groupByUser.isMe = true
            groupByType.messages_user = groupByUser
         }
         groupList.push(groupByType)
         groupByType = { key: null, type: 1 }
         groupByUser = { key: null, sender: null, isMe: false, messages: [] }
      }
   }

   return groupList
}


export const mergeNewMessage = (message: IMessage, list: IGroupMessageByType[]): IGroupMessageByType[] => {
   const lastItem: IGroupMessageByType = last(list)
   const infoUser = getMyAccount()

   if (lastItem.messages_user?.sender?._id === message.sender_id) {
      lastItem.messages_user.messages.push(message)
   } else {
      const groupByType: IGroupMessageByType = { key: generalId(), type: message.message_type }
      if (groupByType.type === 1) {
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
      if (groupByType.type === 2) {
         groupByType.action = message
      }
      list.push(groupByType)
   }

   return list
}