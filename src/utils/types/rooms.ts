import { UserAccount } from "./accounts";
import { IKeyObject } from "./common";
import { IMessage } from "./messages";

export interface ICreateRoom {
   chatroom_name: string
   chatroom_participants: string[]
   chatroom_pic_url?: string
   created_by_user_id: string
   last_message?: ILastMessage
   is_group: boolean
}

export interface IRoom extends Omit<ICreateRoom, 'chatroom_participants'> {
   _id: string
   chatroom_participants: UserAccount[]
   unread_count: number
   nickname: IKeyObject<string>
   last_messages_seen_by?: IKeyObject<string[]> // key should be message_id
}

export interface ILastMessage {
   message_id: IMessage
   timestamp: number
}

export interface IRoomMessageStatus {
   room_id: string
   user_id: string
   last_message_read_id?: string
   unread_count?: number
}

export interface IUpdateRoom {
   chatroom_participants?: UserAccount[]
   chatroom_name?: string
   chatroom_pic_url?: string
   nickname?: IKeyObject<string>
}

export interface IParticipants extends UserAccount {
   nickname?: string
}