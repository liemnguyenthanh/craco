import { IUserNickname } from "@/pages/chat/roomInfo/customRoom/nickname";
import { getMyAccount } from "../helpers"
import { ICreateRoom, IRoom } from "../types/rooms"

const userInfo = getMyAccount()

export const createNewRoom = (chatroom_name: string, chatroom_participants: string[], is_group: boolean): ICreateRoom | null => {
   //FIXME: check duplicate users in backend
   if (chatroom_participants.length === 0) return null;
   chatroom_participants.push(userInfo._id)
   if (is_group) chatroom_name += `, ${userInfo.username}`
   return {
      chatroom_name, chatroom_participants, created_by_user_id: userInfo._id, is_group
   }
}

export const convertCommonRoom = (room: IRoom) => {
   if (!room.is_group && room.chatroom_participants.length === 2) {
      const receiver = room.chatroom_participants.find(user => user._id !== userInfo._id)
      room.chatroom_name = receiver?.username ?? ''
   }
   return room
}

export const convertNicknameUser = (room: IRoom): IUserNickname[] => {
   return room.chatroom_participants.map((user) => {
      let nickname = ''

      if (room.nickname && user._id in room.nickname) {
         nickname = room.nickname[user._id]
      }

      return {
         user_id: user._id,
         username: user.username,
         nickname
      }
   })
}