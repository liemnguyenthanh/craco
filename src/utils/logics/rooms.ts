import { ICreateRoom } from "../types/rooms"

export const createNewRoom = (chatroom_name: string, chatroom_participants: string[], created_by_user_id: string): ICreateRoom | null => {
   if (!chatroom_participants.includes(created_by_user_id)) return null

   return {
      chatroom_name, chatroom_participants, created_by_user_id
   }
}