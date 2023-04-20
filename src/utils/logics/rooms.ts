import { IUserNickname } from "@/pages/chat/roomInfo/customRoom/nickname";
import { getCurrentUser } from "../helpers";
import { IKeyObject } from "../types/common";
import { IMessage } from "../types/messages";
import { ICreateRoom, IRoom } from "../types/rooms";

const userInfo = getCurrentUser()

export const createNewRoom = (chatroom_name: string, chatroom_participants: string[], is_group: boolean): ICreateRoom | null => {
   //FIXME: check duplicate users in backend
   if (chatroom_participants.length === 0) return null;

   chatroom_participants.push(userInfo._id)

   if (is_group) chatroom_name += `, ${userInfo.username}`
   return {
      chatroom_name, chatroom_participants, created_by_user_id: userInfo._id, is_group
   }
}

export const getDataChangedRoom = (message: IMessage): IKeyObject<string> => (JSON.parse(message.message_text))

export const getShowNameUserInRoom = (room: IRoom, user_id: string) => {
   if (room.nickname[user_id]) return room.nickname[user_id]
   return room.chatroom_participants.find(user => user._id === user_id)?.username ?? ''
}

export const convertCommonRoom = (room: IRoom) => {
   if (!room.is_group) {
      const receiver = room.chatroom_participants.find(user => user._id !== userInfo._id)
      room.chatroom_name = receiver?.username ?? ''
   }

   if (!room.nickname) room.nickname = {}

   if (room.last_messages_seen_by && Array.isArray(room.last_messages_seen_by)) {
      room.last_messages_seen_by =
         room.last_messages_seen_by.reduce((new_item: IKeyObject<string[]>, item) => {

            if (item.last_message_read_id && item.user_id !== userInfo._id) {
               if (item.last_message_read_id in new_item) {
                  new_item[item.last_message_read_id].push(item.user_id)
               } else new_item[item.last_message_read_id] = [item.user_id]
            }

            return new_item
         }, {})
   }

   return room
}

export const pushRoomToCommon = (room: IRoom, roomsCommon: IKeyObject<IRoom>) => {
   const currentRoom = roomsCommon[room._id]

   if (!currentRoom) {
      roomsCommon[room._id] = convertCommonRoom(room)
   }
}

export const convertRoomLeftList = (list: IRoom[], roomsCommon: IKeyObject<IRoom>, roomLeft: string[]) => {
   list.forEach(room => {
      roomLeft.push(room._id)
      pushRoomToCommon(room, roomsCommon)
   });
}

export const convertNicknameUser = (room: IRoom): IUserNickname[] => {
   return room.chatroom_participants.map((user) => {
      let nickname = ''

      if (user._id in room.nickname) {
         nickname = room.nickname[user._id]
      }

      return {
         user_id: user._id,
         username: user.username,
         nickname
      }
   })
}

export const handleReadMessage = (user_id: string, message_id: string, last_messages_seen_by: IKeyObject<string[]> | undefined) => {
   if (!last_messages_seen_by) last_messages_seen_by = {}
   for (const [key, value] of Object.entries(last_messages_seen_by)) {
      if (value.includes(user_id)) {
         last_messages_seen_by[key] = value.filter(id => id !== user_id);

         if (message_id in last_messages_seen_by) {
            last_messages_seen_by[message_id].push(user_id);
         } else {
            last_messages_seen_by[message_id] = [user_id];
         }

         return last_messages_seen_by;
      }
   }

   if (message_id in last_messages_seen_by) {
      last_messages_seen_by[message_id].push(user_id);
   } else {
      last_messages_seen_by[message_id] = [user_id];
   }

   return last_messages_seen_by
}