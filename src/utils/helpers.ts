import { v4 as generalId } from 'uuid';
import { IGroupMessageByType, IGroupMessageByUser, IMessage } from './types/messages';

export function getItemLocalStorage(key: string) {
  const value = localStorage.getItem(key);

  if (!value) return null;

  return JSON.parse(value);
}

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
  let groupByUser: IGroupMessageByUser = { key: null, sender: null, messages: [] }

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
      if (groupByUser.key) groupByType.messages_user = groupByUser
      groupList.push(groupByType)
      groupByType = { key: null, type: 1 }
      groupByUser = { key: null, sender: null, messages: [] }
    }
  }

  return groupList
}

export const convertTimeToDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return { date, hours, minutes, day, month, year, amPm, formattedHours }
}

export const convertTime = (timestamp: number | undefined) => {
  if (!timestamp) return null
  const { minutes, day, month, year, amPm, formattedHours } = convertTimeToDate(timestamp)

  return {
    getTimeMessage: () => {
      return `${formattedHours}:${minutes} ${amPm}`
    },
    getDayMonthYear: (fortmat?: string) => {
      return `${day}-${month}-${year}`
    }
  }
}