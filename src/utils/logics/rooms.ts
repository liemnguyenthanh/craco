import { getMyAccount } from "../helpers"
import { ICreateRoom } from "../types/rooms"

const userInfo = getMyAccount()

export const createNewRoom = (chatroom_name: string, chatroom_participants: string[]): ICreateRoom | null => {
   //FIXME: check duplicate in backend
   if (chatroom_participants.length === 0) return null
   chatroom_participants.push(userInfo._id)
   return {
      chatroom_name, chatroom_participants, created_by_user_id: userInfo._id
   }
}